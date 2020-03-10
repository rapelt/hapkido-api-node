Install DB

brew install mysql@5.7
brew link --force mysql@5.7
brew services start mysql@5.7
mysql_secure_installation

To have launchd start mysql@5.7 now and restart at login:

  brew services start mysql@5.7

Or, if you don't want/need a background service you can just run:

  /usr/local/opt/mysql@5.7/bin/mysql.server start

Login: mysql -uroot -p

##Create user:

CREATE USER 'blarg'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'blarg'@'localhost';
FLUSH PRIVILEGES;

Then run SQL scripts in order;

