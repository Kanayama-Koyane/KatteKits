from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate , login 
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from . import models
from . import forms
from .functions import KatteExe,DokodeExe
import json

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
	KattaDict = {
		"KattaList":[]
	}
	NanjiList = []
	for Katta in KattaList:
		DictKatta = {
			"Nani":Katta.Nani,
			"Ikura":Katta.Ikura,
			"Itsu":str(Katta.Nanji.year) + "/" + str(Katta.Nanji.month) + "/" + str(Katta.Nanji.day),
			"Dokode":Katta.Dokode
		}
		NanjiList.append(Katta.Nanji)
		KattaDict["KattaList"].append(DictKatta)
	FirstDate = min(NanjiList)
	KattaDict["Hajimete"] = str(FirstDate.year) +"/" + str(FirstDate.month) +"/" + str(FirstDate.day)
	Today = timezone.now()
	KattaDict["Kyo"] = str(Today.year) + "/" +str(Today.month) + "/" + str(Today.day)
	context = {
		"KattaList":KattaList,
		"KattaDict":json.dumps(KattaDict,ensure_ascii=False)
	}
	return render(request,"Katte/KattaLog.html",context)
