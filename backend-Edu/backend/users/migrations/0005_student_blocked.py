# Generated by Django 3.2.19 on 2023-06-27 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_teacher_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='blocked',
            field=models.BooleanField(default=False),
        ),
    ]
