# Generated by Django 3.2.19 on 2023-07-04 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_student_blocked'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='blocked',
            field=models.BooleanField(default=False),
        ),
    ]
