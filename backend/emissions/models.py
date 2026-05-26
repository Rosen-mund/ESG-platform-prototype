import uuid
from django.db import models
from core.models import Organization
from ingestion.models import RawRecord


class NormalizedEmissionRecord(models.Model):

    SOURCE_TYPES = [
        ("SAP", "SAP"),
        ("UTILITY", "UTILITY"),
        ("TRAVEL", "TRAVEL"),
    ]

    ACTIVITY_TYPES = [
        ("FUEL", "FUEL"),
        ("ELECTRICITY", "ELECTRICITY"),
        ("FLIGHT", "FLIGHT"),
        ("HOTEL", "HOTEL"),
        ("RENTAL_CAR", "RENTAL_CAR"),
        ("PROCUREMENT", "PROCUREMENT"),
    ]

    SCOPES = [
        ("SCOPE_1", "SCOPE_1"),
        ("SCOPE_2", "SCOPE_2"),
        ("SCOPE_3", "SCOPE_3"),
    ]

    STATUS_CHOICES = [
        ("PENDING", "PENDING"),
        ("FLAGGED", "FLAGGED"),
        ("APPROVED", "APPROVED"),
        ("REJECTED", "REJECTED"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.CASCADE,
        related_name="normalized_records"
    )

    source_type = models.CharField(max_length=50, choices=SOURCE_TYPES)

    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)

    scope = models.CharField(max_length=50, choices=SCOPES)

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_quantity = models.FloatField()

    normalized_unit = models.CharField(max_length=50)

    activity_date = models.DateField()

    facility_location = models.CharField(max_length=255)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    is_suspicious = models.BooleanField(default=False)

    approved_by = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    approved_at = models.DateTimeField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.quantity}"