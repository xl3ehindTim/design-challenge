# Generated by Django 4.0.3 on 2022-11-08 08:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0002_calenderentry'),
    ]

    operations = [
        migrations.AddField(
            model_name='calenderentry',
            name='from_station',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='from_station', to='stations.station'),
        ),
        migrations.AddField(
            model_name='calenderentry',
            name='to_station',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='to_station', to='stations.station'),
        ),
    ]
