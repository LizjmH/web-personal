use web;
create database web;
create table registro(
idRegistro int (50)primary key auto_increment,
nombre varchar(30) not null,
nombreU varchar (30) not null,
pais varchar(30) not null,
correo varchar (50)not null,
contra varchar(50)not null
);
create table sesion(
idlogin int (50)primary key auto_increment,
correo varchar (50) not null,
contra varchar(50)not null
);
