# Generated by Django 3.2.21 on 2023-10-01 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Katte', '0004_rename_dokode_dokode_doko'),
    ]

    operations = [
        migrations.AddField(
            model_name='katte',
            name='Dare',
            field=models.CharField(max_length=1024, null=True, verbose_name='User'),
        ),
    ]
