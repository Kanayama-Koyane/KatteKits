from django import forms
from . import models

class Katte(forms.Form):
	New = forms.CharField(max_length = 1024)

class Katta(forms.Form):
	Ikura = forms.IntegerField(
		required = True,
		widget = forms.NumberInput
	)
	def __init__(self,*args,**kwargs):
		super().__init__(*args,**kwargs)
		DokodeList = models.Dokode.objects.all()
		self.DokodeChoice = ()
		for DokodeModel in DokodeList:
			self.DokodeChoice = self.DokodeChoice + ((DokodeModel.id,DokodeModel.Doko),)
		self.fields['Dokode'] = forms.ChoiceField(
			choices = self.DokodeChoice,
			required = True,
			widget = forms.widgets.Select()
		)
class Dokode(forms.Form):
	New = forms.CharField(max_length=1024)
	Dokosore = forms.CharField(max_length=8192)
