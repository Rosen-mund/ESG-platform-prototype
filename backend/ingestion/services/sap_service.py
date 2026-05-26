import pandas as pd

from core.models import Organization
from ingestion.models import DataSourceUpload, RawRecord
from emissions.models import NormalizedEmissionRecord


def process_sap_csv(file, uploaded_by, organization_id):

    organization = Organization.objects.get(
    id=organization_id
    )

    upload = DataSourceUpload.objects.create(
        organization=organization,
        source_type="SAP",
        upload_method="CSV",
        original_file_name=file.name,
        uploaded_by=uploaded_by,
        processing_status="PROCESSING"
    )

    df = pd.read_csv(file)

    for _, row in df.iterrows():

        raw_record = RawRecord.objects.create(
            upload=upload,
            raw_payload=row.where(pd.notnull(row), None).to_dict()
        )

        quantity = row.get("MENGE", 0)
        unit = row.get("MEINS", "")
        material = row.get("MAKTX", "")

        validation_status = "VALID"
        is_suspicious = False
        validation_errors = []

        # validation logic

        if pd.isna(quantity):
            validation_status = "INVALID"
            validation_errors.append("Missing quantity")

        elif quantity < 0:
            validation_status = "FLAGGED"
            is_suspicious = True
            validation_errors.append("Negative quantity")

        if unit == "XYZ":
            validation_status = "FLAGGED"
            is_suspicious = True
            validation_errors.append("Unknown unit")

        if quantity > 100000:
            validation_status = "FLAGGED"
            is_suspicious = True
            validation_errors.append("Suspiciously high quantity")

        raw_record.validation_status = validation_status
        raw_record.validation_errors = validation_errors
        raw_record.save()

        # normalization logic

        normalized_quantity = quantity
        normalized_unit = unit

        if unit == "gallon":
            normalized_quantity = quantity * 3.78541
            normalized_unit = "L"

        activity_type = "PROCUREMENT"
        scope = "SCOPE_3"

        material_upper = material.upper()

        if "DIESEL" in material_upper:
            activity_type = "FUEL"
            scope = "SCOPE_1"

        elif "GAS" in material_upper:
            activity_type = "FUEL"
            scope = "SCOPE_1"

        elif "JET" in material_upper:
            activity_type = "FUEL"
            scope = "SCOPE_1"

        elif "ELECTRICITY" in material_upper:
            activity_type = "ELECTRICITY"
            scope = "SCOPE_2"

        NormalizedEmissionRecord.objects.create(
            organization=organization,
            raw_record=raw_record,
            source_type="SAP",
            activity_type=activity_type,
            scope=scope,
            quantity=quantity,
            unit=unit,
            normalized_quantity=normalized_quantity,
            normalized_unit=normalized_unit,
            activity_date=pd.to_datetime(
                row["BUDAT"],
                dayfirst=True,
                errors="coerce"
            ).date(),
            facility_location=row.get("WERKS", ""),
            status="FLAGGED" if is_suspicious else "PENDING",
            is_suspicious=is_suspicious
        )

    upload.processing_status = "COMPLETED"
    upload.save()

    return upload