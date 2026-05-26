from rest_framework import serializers


class FileUploadSerializer(serializers.Serializer):

    file = serializers.FileField()

    uploaded_by = serializers.CharField()

    organization_id = serializers.UUIDField()