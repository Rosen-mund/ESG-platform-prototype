from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from .models import Organization

from .serializers import (
    OrganizationSerializer
)


class OrganizationListCreateView(
    APIView
):

    def get(self, request):

        organizations = Organization.objects.all()

        serializer = OrganizationSerializer(
                organizations,
                many=True
            )

        return Response(
            serializer.data
        )

    def post(self, request):

        serializer = OrganizationSerializer(
                data=request.data
            )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class OrganizationDeleteView(
    APIView
):

    def delete(
        self,
        request,
        organization_id
    ):

        try:

            organization = Organization.objects.get(
                    id=organization_id
                )

            organization.delete()

            return Response(
                {
                    "message":
                    "Organization deleted"
                }
            )

        except Organization.DoesNotExist:

            return Response(
                {
                    "error":
                    "Organization not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )