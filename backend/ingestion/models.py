import uuid
from django.db import models
from core.models import Organization


class DataSourceUpload(models.Model):

    SOURCE_TYPES = [
        ("SAP", "SAP"),
        ("UTILITY", "UTILITY"),
        ("TRAVEL", "TRAVEL"),
    ]

    UPLOAD_METHODS = [
        ("CSV", "CSV"),
        ("API", "API"),
    ]

    PROCESSING_STATUS = [
        ("PROCESSING", "PROCESSING"),
        ("COMPLETED", "COMPLETED"),
        ("FAILED", "FAILED"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(max_length=50, choices=SOURCE_TYPES)

    upload_method = models.CharField(max_length=50, choices=UPLOAD_METHODS)

    original_file_name = models.CharField(max_length=255, blank=True, null=True)

    uploaded_by = models.CharField(max_length=255)

    processing_status = models.CharField(
        max_length=50,
        choices=PROCESSING_STATUS,
        default="PROCESSING"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type} - {self.uploaded_at}"


class RawRecord(models.Model):

    VALIDATION_STATUS = [
        ("VALID", "VALID"),
        ("FLAGGED", "FLAGGED"),
        ("INVALID", "INVALID"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    upload = models.ForeignKey(
        DataSourceUpload,
        on_delete=models.CASCADE,
        related_name="raw_records"
    )

    raw_payload = models.JSONField()

    validation_status = models.CharField(
        max_length=50,
        choices=VALIDATION_STATUS,
        default="VALID"
    )

    validation_errors = models.JSONField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)