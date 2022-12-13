# Generated by Django 4.0.3 on 2022-12-09 09:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0004_bookingentry'),
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='booking_option',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='booking_order', to='stations.bookingentry'),
        ),
        migrations.AlterField(
            model_name='order',
            name='amount_of_tickets',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
