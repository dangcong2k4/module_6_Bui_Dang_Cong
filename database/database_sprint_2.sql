drop database if exists food_store_CBD;
create database food_store_CBD ;
use food_store_CBD;

create table `user`(
id int auto_increment primary key,
`name` varchar(255),
username varchar(255),
`password` varchar(255),
phone_number varchar(255),
email varchar(255),
address varchar(255),
id_Card varchar(225),
gender bit,
dateOfBirth date
);
 create table `role`(
 id int auto_increment primary key,
`name` varchar(255)
);
 create table user_role(
 id_role int,
 id_user int,
 primary key(id_role,id_user),
 foreign key(id_user) references `user`(id),
  foreign key(id_role) references `role`(id)
 );
 
  create table size(
  id int auto_increment primary key,
  `name` varchar(255)
  );
  
  create table bill (
id int auto_increment primary key,
id_user int,
buy_date date,
detail varchar(255),
money_total double,
quantity int,
payment_method varchar(255),
foreign key(id_user) references user(id)
);

 
 create table food(
id int auto_increment primary key,
`name` varchar(255),
price double,
image varchar(255),
`description` varchar(255),
flag_delete boolean
);
 create table food_size(
id_size int,
id_food int,
primary key(id_size,id_food),
foreign key(id_size) references size(id),
foreign key(id_food) references food(id)
);
 create table bill_history (
id_food int ,
id_bill int,
primary key(id_bill,id_food),
foreign key(id_food) references food(id),
foreign key(id_bill) references bill(id)
);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 