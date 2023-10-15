from . import models
from django.utils import timezone

def KattaAdd(request,Katte_id):
	post = request.POST
	ExedKatte = models.Katte.objects.get(pk = Katte_id)
	ExedKatte.Status = "Katta!"
	ExedKatte.save()
	Dokode_id = int(post["Dokode"])
	DokodeAdd = models.Dokode.objects.get(pk = Dokode_id)
	AddedKatta = models.Katta(
		Nani = ExedKatte.Nani,
		Dokode = DokodeAdd.Doko,
		Ikura = post["Ikura"],
		Nanji = timezone.now(),
		Dare = request.user.username
	)
	AddedKatta.save()

def KatteAdd(request):
	post = request.POST
	AddedKatte = models.Katte(
		Nani = post["New"],
		Status = "Katte!",
		Dare = request.user.id	
	)
	AddedKatte.save()

def KatteExe(request):
	post = request.POST
	BoolAdd = True
	for status in post:
		if "Katta_" in status:
			Katte_id = int(status.replace("Katta_",""))
			KattaAdd(request,Katte_id)
			BoolAdd = False
			break
	if BoolAdd:
		KatteAdd(request)

def DokodeExe(request):
	post = request.POST
	if "Add" in post:
		AddDokode = models.Dokode(
			Doko = post["New"],
			Dokosore = post["Dokosore"]
		)
		AddDokode.save()
