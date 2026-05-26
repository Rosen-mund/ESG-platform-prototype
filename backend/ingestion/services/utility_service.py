import pandas as pd

from core.models import Organization
from ingestion.models import DataSourceUpload, RawRecord
from emissions.models import NormalizedEmissionRecord


def process_utility_csv(file,uploaded_by,organization_id):

    organization = Organization.objects.get(
    id=organization_id
    )

    upload = DataSourceUpload.objects.create(
        organization=organization,
        source_type="UTILITY",
        upload_method="CSV",
        original_file_name=file.name,
        uploaded_by=uploaded_by,
        processing_status="PROCESSING"
    )

    df = pd.read_csv(
    file,
    quotechar='"',
    skipinitialspace=True
    )
    print(df.columns)

    for _, row in df.iterrows():

        cleaned_row = row.where(pd.notnull(row), None)
        raw_record = RawRecord.objects.create(
            upload=upload,
            raw_payload=cleaned_row.to_dict()
        )

        consumption = row.get("Consumption (kWh)", 0)

        validation_status = "VALID"
        is_suspicious = False
        validation_errors = []

        # validation logic

        if pd.isna(consumption):
            validation_status = "INVALID"
            validation_errors.append("Missing consumption value")

        elif consumption < 0:

            address = str(row.get("Service Address", "")).upper()

            if "SOLAR" not in address:
                validation_status = "FLAGGED"
                is_suspicious = True
                validation_errors.append(
                    "Negative consumption outside solar export"
                )

        if consumption > 500000:
            validation_status = "FLAGGED"
            is_suspicious = True
            validation_errors.append(
                "Suspiciously high electricity usage"
            )

        if row.get("Bill Type") == "ESTIMATED":
            validation_status = "FLAGGED"
            is_suspicious = True
            validation_errors.append(
                "Estimated utility bill"
            )

        raw_record.validation_status = validation_status
        raw_record.validation_errors = validation_errors
        raw_record.save()

        # normalization

        normalized_quantity = consumption
        normalized_unit = "kWh"

        # detect MWh values

        if consumption and consumption < 100:
            normalized_quantity = consumption * 1000

        activity_date = pd.to_datetime(
            row["End Date"],
            errors="coerce"
        ).date()

        NormalizedEmissionRecord.objects.create(
            organization=organization,
            raw_record=raw_record,
            source_type="UTILITY",
            activity_type="ELECTRICITY",
            scope="SCOPE_2",
            quantity=consumption,
            unit="kWh",
            normalized_quantity=normalized_quantity,
            normalized_unit=normalized_unit,
            activity_date=activity_date,
            facility_location=row.get("Service Address", ""),
            status="FLAGGED" if is_suspicious else "PENDING",
            is_suspicious=is_suspicious
        )

    upload.processing_status = "COMPLETED"
    upload.save()

    return upload