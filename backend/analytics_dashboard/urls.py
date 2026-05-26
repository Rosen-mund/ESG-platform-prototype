from django.urls import path

from .views import (
    DashboardSummaryView,
    RecentUploadsView,
    SuspiciousRecordsView,
    UpdateRecordStatusView
)

urlpatterns = [

    path(
        "summary/",
        DashboardSummaryView.as_view()
    ),

    path(
        "recent-uploads/",
        RecentUploadsView.as_view()
    ),
    path(
    "suspicious-records/",
    SuspiciousRecordsView.as_view()
    ),
    path(
    "update-status/<uuid:record_id>/",
    UpdateRecordStatusView.as_view()
    ),
]