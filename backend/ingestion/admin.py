from django.contrib import admin
from .models import DataSourceUpload, RawRecord

admin.site.register(DataSourceUpload)
admin.site.register(RawRecord)