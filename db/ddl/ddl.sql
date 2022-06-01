/* user */
create table if not exists user (
  userId int auto_increment not null,
  email varchar(100) unique not null, 
  firstName varchar(100) not null, 
  lastName varchar(100) not null, 
  score int,
  primary key(userId)
);

drop trigger if exists before_insert_user;

create trigger before_insert_user
before insert
on user for each row set newUser.email = lower(trim(newUser.email));