from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import FileUploadSerializer

from .services.sap_service import process_sap_csv
from .services.utility_service import process_utility_csv
from .services.travel_service import process_travel_json


class SAPUploadView(APIView):

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)

        if serializer.is_valid():

            file = serializer.validated_data["file"]

            uploaded_by = serializer.validated_data[
                "uploaded_by"
            ]

            organization_id = serializer.validated_data[
                "organization_id"
            ]

            upload = process_sap_csv(
                file,
                uploaded_by,
                organization_id
            )

            return Response(
                {
                    "message": "SAP CSV processed successfully",
                    "upload_id": str(upload.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class UtilityUploadView(APIView):

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)

        if serializer.is_valid():

            file = serializer.validated_data["file"]

            uploaded_by = serializer.validated_data[
                "uploaded_by"
            ]

            organization_id = serializer.validated_data[
                "organization_id"
            ]

            upload = process_utility_csv(
                file,
                uploaded_by,
                organization_id
            )

            return Response(
                {
                    "message": "Utility CSV processed successfully",
                    "upload_id": str(upload.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class TravelUploadView(APIView):

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)

        if serializer.is_valid():

            file = serializer.validated_data["file"]

            uploaded_by = serializer.validated_data[
                "uploaded_by"
            ]

            organization_id = serializer.validated_data[
                "organization_id"
            ]

            upload = process_travel_json(
                file,
                uploaded_by,
                organization_id
            )

            return Response(
                {
                    "message": "Travel JSON processed successfully",
                    "upload_id": str(upload.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )