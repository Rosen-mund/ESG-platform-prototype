import json
import pandas as pd

from core.models import Organization
from ingestion.models import DataSourceUpload, RawRecord
from emissions.models import NormalizedEmissionRecord


def process_travel_json(file,uploaded_by,organization_id):

    organization = Organization.objects.get(
    id=organization_id
    )

    upload = DataSourceUpload.objects.create(
        organization=organization,
        source_type="TRAVEL",
        upload_method="API",
        original_file_name=file.name,
        uploaded_by=uploaded_by,
        processing_status="PROCESSING"
    )

    data = json.load(file)

    for row in data:

        cleaned_row = {
            k: (None if pd.isna(v) else v)
            for k, v in row.items()
        }

        raw_record = RawRecord.objects.create(
            upload=upload,
            raw_payload=cleaned_row
        )

        validation_status = "VALID"
        is_suspicious = False
        validation_errors = []

        trip_type = row.get("trip_type", "")

        # validation logic

        if trip_type == "Flight":

            if not row.get("departure_airport"):
                validation_status = "INVALID"
                validation_errors.append(
                    "Missing departure airport"
                )

            if not row.get("arrival_airport"):
                validation_status = "INVALID"
                validation_errors.append(
                    "Missing arrival airport"
                )

            if not row.get("cabin_class"):
                validation_status = "FLAGGED"
                is_suspicious = True
                validation_errors.append(
                    "Missing cabin class"
                )

        if trip_type == "Hotel":

            nights = row.get("hotel_nights", 0)

            if nights <= 0:
                validation_status = "INVALID"
                validation_errors.append(
                    "Invalid hotel nights"
                )

            if nights > 30:
                validation_status = "FLAGGED"
                is_suspicious = True
                validation_errors.append(
                    "Suspiciously long hotel stay"
                )

        if trip_type == "Rental Car":

            days = row.get("rental_car_days", 0)

            if days <= 0:
                validation_status = "INVALID"
                validation_errors.append(
                    "Invalid rental car days"
                )

        raw_record.validation_status = validation_status
        raw_record.validation_errors = validation_errors
        raw_record.save()

        # normalization

        quantity = 1
        unit = "trip"

        if trip_type == "Hotel":
            quantity = row.get("hotel_nights", 0)
            unit = "nights"

        elif trip_type == "Rental Car":
            quantity = row.get("rental_car_days", 0)
            unit = "days"

        activity_date = pd.to_datetime(
            row.get("departure_date"),
            errors="coerce"
        )

        NormalizedEmissionRecord.objects.create(
            organization=organization,
            raw_record=raw_record,
            source_type="TRAVEL",
            activity_type=trip_type.upper(),
            scope="SCOPE_3",
            quantity=quantity,
            unit=unit,
            normalized_quantity=quantity,
            normalized_unit=unit,
            activity_date=activity_date,
            facility_location=row.get(
                "arrival_airport",
                "Travel Activity"
            ),
            status="FLAGGED" if is_suspicious else "PENDING",
            is_suspicious=is_suspicious
        )

    upload.processing_status = "COMPLETED"
    upload.save()

    return upload