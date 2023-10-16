from django.contrib import admin
from . import models

# Register your models here.
class KatteAdmin(admin.ModelAdmin):
    pass
class KattaAdmin(admin.ModelAdmin):
    pass
class DokodeAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Katte,KatteAdmin)
admin.site.register(models.Katta,KattaAdmin)
admin.site.register(models.Dokode,DokodeAdmin)