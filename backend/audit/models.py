import uuid
from django.db import models
from emissions.models import NormalizedEmissionRecord


class AuditLog(models.Model):

    ACTIONS = [
        ("UPLOAD", "UPLOAD"),
        ("EDIT", "EDIT"),
        ("APPROVE", "APPROVE"),
        ("REJECT", "REJECT"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    emission_record = models.ForeignKey(
        NormalizedEmissionRecord,
        on_delete=models.CASCADE,
        related_name="audit_logs"
    )

    action = models.CharField(max_length=50, choices=ACTIONS)

    old_values = models.JSONField(blank=True, null=True)

    new_values = models.JSONField(blank=True, null=True)

    performed_by = models.CharField(max_length=255)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} - {self.timestamp}"