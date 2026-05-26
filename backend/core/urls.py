from django.urls import path

from .views import (
    OrganizationListCreateView,
    OrganizationDeleteView
)

urlpatterns = [

    path(
        "organizations/",
        OrganizationListCreateView.as_view()
    ),

    path(
        "organizations/<uuid:organization_id>/",
        OrganizationDeleteView.as_view()
    ),
]