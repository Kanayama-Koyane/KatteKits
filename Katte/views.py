from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.decorators import login_required
from django.forms import ChoiceField,widgets
from . import models
from . import forms
from .functions import KatteExe,DokodeExe
# Create your views here.
def Login(request):
	if request.method == "POST":
		ID = request.POST.get("userid")
		Pass = request.POST.get("password")
		user = authenticate(username = ID , password = Pass)
		if user:
			if user.is_active:
				login(request,user)
				return render(request,"Katte/Home.html")
			else:
				return HttpResponse("Invalid ID or Password!")
	else:
		return render(request,"Katte/Login.html")

@login_required
def Katte(request):
    KatteList = models.Katte.objects.filter(Status="Katte!")
    from . import forms
    KatteForm = forms.Katte()
    DokodeList = models.Dokode.objects.all()
    DokodeChoice = ()
    for DokodeModel in DokodeList:
        DokodeChoice = DokodeChoice + ((DokodeModel.id,DokodeModel.Doko),)
    KattaForm = forms.Katta()
    if request.method == "POST":
        KatteExe(request)
        KatteList = models.Katte.objects.filter(Status="Katte!")
        from . import forms
        KatteForm = forms.Katte()
        return render(request,"Katte/Katte.html",{"KatteList":KatteList,"KatteForm":KatteForm,"KattaForm":KattaForm})
    else:
        return render(request,"Katte/Katte.html",{"KatteList":KatteList,"KatteForm":KatteForm,"KattaForm":KattaForm})
@login_required
def Dokode(request):
	DokodeList = models.Dokode.objects.all()
	DokodeForm = forms.Dokode()
	if request.method == "POST":
		DokodeList = models.Dokode.objects.all()
		DokodeExe(request)
		return render(request,"Katte/Dokode.html",{"DokodeList":DokodeList,"DokodeForm":DokodeForm})
	else:
		return render(request,"Katte/Dokode.html",{"DokodeList":DokodeList,"DokodeForm":DokodeForm})

@login_required
def KattaLog(request):
	KattaList = models.Katta.objects.all()
	return render(request,"Katte/KattaLog.html",{"KattaList":KattaList})
