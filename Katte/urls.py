from django.urls import path
from . import views

app_name = "Katte"

urlpatterns = [
	path("",views.Login,name="Home"),
	path("Katte",views.Katte,name="Katte"),
	path("Dokode",views.Dokode,name="Dokode"),
	path("KattaLog",views.KattaLog,name="KattaLog")
]

