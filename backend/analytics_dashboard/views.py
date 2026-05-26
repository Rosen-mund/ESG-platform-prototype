from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from core.models import Organization

from ingestion.models import (
    DataSourceUpload,
    RawRecord
)

from emissions.models import (
    NormalizedEmissionRecord
)


class DashboardSummaryView(APIView):

    def get(self, request):

        organization_id = request.GET.get(
            "organization_id"
        )

        if not organization_id:

            return Response(
                {
                    "error":
                    "organization_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            organization =Organization.objects.get(
                    id=organization_id
                )

        except Organization.DoesNotExist:

            return Response(
                {
                    "error":
                    "Organization not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        uploads =DataSourceUpload.objects.filter(
                organization=organization
            )

        raw_records = RawRecord.objects.filter(
                upload__organization=organization
            )

        normalized_records = NormalizedEmissionRecord.objects.filter(
                organization=organization
            )

        total_uploads = uploads.count()

        total_raw_records = raw_records.count()

        total_normalized_records = normalized_records.count()

        suspicious_records = normalized_records.filter(
                is_suspicious=True
            ).count()

        source_breakdown = (
            normalized_records
            .values("source_type")
            .annotate(count=Count("id"))
        )

        scope_breakdown = (
            normalized_records
            .values("scope")
            .annotate(count=Count("id"))
        )

        return Response({

            "organization": {
                "id": str(organization.id),
                "name": organization.name
            },

            "total_uploads":
                total_uploads,

            "total_raw_records":
                total_raw_records,

            "total_normalized_records":
                total_normalized_records,

            "suspicious_records":
                suspicious_records,

            "source_breakdown":
                list(source_breakdown),

            "scope_breakdown":
                list(scope_breakdown),
        })


class RecentUploadsView(APIView):

    def get(self, request):

        organization_id = request.GET.get(
            "organization_id"
        )

        if not organization_id:

            return Response(
                {
                    "error":
                    "organization_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            organization = Organization.objects.get(
                    id=organization_id
                )

        except Organization.DoesNotExist:

            return Response(
                {
                    "error":
                    "Organization not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        uploads = (
            DataSourceUpload.objects
            .filter(
                organization=organization
            )
            .order_by("-uploaded_at")[:10]
        )

        results = []

        for upload in uploads:

            suspicious_count = (
                upload.raw_records.filter(
                    validation_status="FLAGGED"
                ).count()
            )

            results.append({

                "id": str(upload.id),

                "source_type":
                    upload.source_type,

                "uploaded_by":
                    upload.uploaded_by,

                "status":
                    upload.processing_status,

                "uploaded_at":
                    upload.uploaded_at,

                "suspicious_count":
                    suspicious_count
            })

        return Response(results)


class SuspiciousRecordsView(APIView):

    def get(self, request):

        organization_id = request.GET.get(
            "organization_id"
        )

        if not organization_id:

            return Response(
                {
                    "error":
                    "organization_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        records = (
            NormalizedEmissionRecord.objects
            .filter(
                organization_id=organization_id,
                is_suspicious=True
            )
            .order_by("-created_at")[:10]
        )

        results = []

        for record in records:

            results.append({

                "id": str(record.id),

                "source_type":
                    record.source_type,

                "activity_type":
                    record.activity_type,

                "scope":
                    record.scope,

                "quantity":
                    record.quantity,

                "unit":
                    record.unit,

                "facility_location":
                    record.facility_location,

                "status":
                    record.status,

                "created_at":
                    record.created_at,

                "approved_by":
                    record.approved_by,

                "approved_at":
                    record.approved_at,

                "raw_record_id":
                    str(record.raw_record.id),

                "raw_payload":
                    record.raw_record.raw_payload

            })

        return Response(results)


class UpdateRecordStatusView(APIView):

    def patch(
        self,
        request,
        record_id
    ):

        try:

            record = NormalizedEmissionRecord.objects.get(
                    id=record_id
                )

            status_value = request.data.get("status")

            if status_value not in [
                "APPROVED",
                "REJECTED"
            ]:

                return Response(
                    {
                        "error":
                        "Invalid status"
                    },
                    status=400
                )

            record.status = status_value

            record.status = status_value

            if status_value == "APPROVED":

                record.approved_by = "Analyst User"

                record.approved_at = timezone.now()

            else:

                record.approved_by = (
                    "Rejected by Analyst User"
                )

                record.approved_at = timezone.now()

            record.save()

            return Response(
                {
                    "message":
                    "Status updated"
                }
            )

        except (
            NormalizedEmissionRecord
            .DoesNotExist
        ):

            return Response(
                {
                    "error":
                    "Record not found"
                },
                status=404
            )