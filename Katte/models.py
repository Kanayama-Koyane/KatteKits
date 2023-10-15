from django.db import models

# Create your models here.
class Katte(models.Model):
	Nani = models.CharField("Nani",max_length = 1024)
	Status = models.CharField("Status",max_length = 1024)
	Dare = models.CharField("User",null=True,max_length = 1024)

class Katta(models.Model):
	Nani = models.CharField("Nani",max_length = 1024)
	Dokode = models.CharField("Dokode",max_length = 1024)
	Ikura = models.IntegerField("Ikura")
	Nanji = models.DateTimeField("Nanji")
	Dare = models.CharField("Dare",max_length = 1024)

class Dokode(models.Model):
	Doko = models.CharField("Dokode",max_length = 1024)
	Dokosore = models.CharField("Dokosore",null = True,max_length = 8192)
