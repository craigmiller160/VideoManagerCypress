# Set Up Environment For pg-native

pg-native is a NodeJS library for connecting to Postgres. To work, it requires Postgres to be directly installed on the OS. Not run through docker, but actually installed. Fortunately, this can be done while still relying on the docker-configured postgres for the actual application. Installing it locally only provides system utilities that pg-native requires.

To set it up, first install these dependencies:

```
apt install build-essential postgresql-common
apt install libpq-dev
```

Then make sure you turn off the newly installed postgres:

```
service postgresql stop
systemctl disable postgresql
```
