# Generated by Django 4.0.3 on 2022-11-15 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='green_coins',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=50),
        ),
    ]
