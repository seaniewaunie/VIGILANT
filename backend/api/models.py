# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ApiCrimedata(models.Model):
    crime_id = models.IntegerField(db_column='crime_ID', primary_key=True)  # Field name made lowercase.
    date = models.DateField()
    time = models.TimeField()
    day = models.CharField(max_length=3)
    crime_code = models.CharField(max_length=4)
    description = models.CharField(max_length=20)
    district = models.CharField(max_length=12)
    weapon = models.CharField(max_length=7)
    address = models.CharField(max_length=32)
    neighborhood = models.CharField(max_length=25)
    premise = models.CharField(max_length=10)
    inside_outside = models.CharField(max_length=1)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        managed = False
        db_table = 'api_crimedata'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Crimedata(models.Model):
    crime_id = models.IntegerField(db_column='crime_ID', primary_key=True)  # Field name made lowercase.
    date = models.DateField()
    time = models.TimeField()
    day = models.CharField(max_length=10)
    code = models.CharField(max_length=10)
    description = models.CharField(max_length=45)
    district = models.CharField(max_length=45)
    weapon = models.CharField(max_length=45, blank=True, null=True)
    address = models.CharField(max_length=45, blank=True, null=True)
    neighborhood = models.CharField(max_length=45, blank=True, null=True)
    premise = models.CharField(max_length=45, blank=True, null=True)
    inside_outside = models.CharField(max_length=45, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'crimedata'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Globalfilters(models.Model):
    global_filter_id = models.IntegerField(db_column='global_filter_ID', primary_key=True)  # Field name made lowercase.
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    district = models.CharField(max_length=45, blank=True, null=True)
    weapon = models.CharField(max_length=45, blank=True, null=True)
    address = models.CharField(max_length=45, blank=True, null=True)
    neighborhood = models.CharField(max_length=45, blank=True, null=True)
    premise = models.CharField(max_length=45, blank=True, null=True)
    inside_outside = models.CharField(max_length=45, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'globalfilters'


class Localfilters(models.Model):
    local_filter_id = models.IntegerField(db_column='local_filter_ID', primary_key=True)  # Field name made lowercase.
    fk_user = models.ForeignKey('Users', models.DO_NOTHING, db_column='fk_user_ID')  # Field name made lowercase.
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)
    district = models.CharField(max_length=45, blank=True, null=True)
    weapon = models.CharField(max_length=45, blank=True, null=True)
    address = models.CharField(max_length=45, blank=True, null=True)
    neighborhood = models.CharField(max_length=45, blank=True, null=True)
    premise = models.CharField(max_length=45, blank=True, null=True)
    inside_outside = models.CharField(max_length=45, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'localfilters'


class Users(models.Model):
    user_id = models.IntegerField(db_column='user_ID', primary_key=True)  # Field name made lowercase.
    global_filter = models.ForeignKey(Globalfilters, models.DO_NOTHING, db_column='global_filter_ID', unique=True)  # Field name made lowercase.
    password = models.CharField(max_length=45, blank=True, null=True)
    username = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
        unique_together = (('user_id', 'global_filter'),)
