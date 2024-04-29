-- CS4400: Introduction to Database Systems (Spring 2024)
-- Phase II: Create Table & Insert Statements [v0] Monday, February 19, 2024 @ 12:00am EST

-- Team 101
-- Patrick Kim (pkim308)
-- Guozhen Miao (gmiao8)
-- Hsiang-Pin Ko (hko44)
-- Namkhang Nguyen Le (nnguyen344)
-- Akash Misra (amisra43)

-- Directions:
-- Please follow all instructions for Phase II as listed on Canvas.
-- Fill in the team number and names and GT usernames for all members above.
-- Create Table statements must be manually written, not taken from an SQL Dump file.
-- This file must run without error for credit.

/* This is a standard preamble for most of our scripts.  The intent is to establish
a consistent environment for the database behavior. */
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'drone_dispatch';
drop database if exists drone_dispatch;
create database if not exists drone_dispatch;
use drone_dispatch;

-- Define the database structures
/* You must enter your tables definitions, along with your primary, unique and foreign key
declarations, and data insertion statements here.  You may sequence them in any order that
works for you.  When executed, your statements must create a functional database that contains
all of the data, and supports as many of the constraints as reasonably possible. */

# Create Tables
create table users
	(uname		varchar(40)		not null,
     address	varchar(500)	not null,
     birthdate	date,
     fname		varchar(100)	not null,
     lname		varchar(100)	not null,
     
     primary key (uname));
     
create table customer
	(uname		varchar(40)		not null,
     rating		int				not null check (rating > 0 and rating < 6),
     credit		int				not null,
     
     primary key (uname),
     foreign key (uname) references users(uname));

create table employee
	(uname		varchar(40)		not null,
     taxID		char(11)		not null check (taxID like '___-__-____'),
     service	int				not null,
     salary		int				not null,
     
     primary key (uname),
     foreign key (uname) references users(uname),
     unique (taxID));

create table store_worker
	(uname		varchar(40)		not null,
     
     primary key (uname),
     foreign key (uname) references employee(uname));

create table store
	(storeID	varchar(40)		not null,
     sname		varchar(100)	not null,
	 revenue	int				not null,
     manager_uname		varchar(40)		not null,
     
     primary key (storeID),
     foreign key (manager_uname) references store_worker(uname),
     unique(manager_uname));

create table drone_pilot
	(uname		varchar(40)		not null,
     licenseID	varchar(40)		not null,
     experience	int				not null,
     
     primary key (uname),
     foreign key (uname) references employee(uname),
     unique (licenseID));

create table drone
	(droneTag	varchar(40)		not null,
     storeID	varchar(40)		not null,
     capacity	int				not null,
	 rem_trips	int				not null,
	 drone_pilot_uname	varchar(40)		not null,
     
     primary key (droneTag, storeID),
     foreign key (storeID) references store(storeID),
     foreign key (drone_pilot_uname) references drone_pilot(uname),
     unique(drone_pilot_uname));

create table orders
	(orderID	varchar(40)		not null,
     sold_on	date			not null,
     droneTag	varchar(40)		not null,
     storeID	varchar(40)		not null,
     customer_uname		varchar(40)		not null,
     
     primary key (orderID),
     foreign key (droneTag, storeID) references drone(droneTag, storeID),
     foreign key (customer_uname) references customer(uname));

create table product
	(barcode	varchar(40)		not null,
     pname		varchar(100)	not null,
     weight		int				not null,
     
     primary key (barcode));

create table contain
	(barcode	varchar(40)		not null,
     orderID	varchar(40)		not null,
     price		int				not null,
     quantity	int				not null,
     
     primary key (barcode, orderID),
     foreign key (barcode) references product(barcode),
     foreign key (orderID) references orders(orderID));
     
create table employ
	(store_worker_uname	varchar(40)		not null,
     storeID			varchar(40)		not null,
     
     primary key (store_worker_uname, storeID),
     foreign key (store_worker_uname) references store_worker(uname),
     foreign key (storeID) references store(storeID));
     
insert into users values
('awilson5', '220 Peachtree Street', '1963-11-11', 'Aaron', 'Wilson'),
('csoares8', '706 Living Stone Way', '1965-09-03', 'Claire', 'Soares'),
('echarles19', '22 Peachtree Street', '1974-05-06', 'Ella', 'Charles'),
('eross10', '22 Peachtree Street', '1975-04-02', 'Erica', 'Ross'),
('hstark16', '53 Tanker Top Lane', '1971-10-27', 'Harmon', 'Stark'),
('jstone5', '101 Five Finger Way', '1961-01-06', 'Jared', 'Stone'),
('lrodriguez5', '360 Corkscrew Circle', '1975-04-02', 'Lina', 'Rodriguez'),
('sprince6', '22 Peachtree Street', '1968-06-15', 'Sarah', 'Prince'),
('tmccall5', '360 Corkscrew Circle', '1973-03-19', 'Trey', 'McCall')
;

insert into customer values
('awilson5', 2, 100),
('jstone5', 4, 40),
('lrodriguez5', 4, 60),
('sprince6', 5, 30)
;
     
insert into employee values
('awilson5', '111-11-1111', 9, 46000),
('csoares8', '888-88-8888', 26, 57000),
('echarles19', '777-77-7777', 3, 27000),
('eross10', '444-44-4444', 10, 61000),
('hstark16', '555-55-5555', 20, 59000),
('lrodriguez5', '222-22-2222', 20, 58000),
('tmccall5', '333-33-3333', 29, 33000)
;
     
insert into store_worker values
('echarles19'),
('eross10'),
('hstark16')
;
     
insert into store values
('pub', 'Publix', 200, 'hstark16'),
('krg', 'Kroger', 300, 'echarles19')
;
     
insert into drone_pilot values
('awilson5', '314159', 41),
('lrodriguez5', '287182', 67),
('tmccall5', '181633', 10)
;

insert into drone values
('drone1', 'pub', 10, 3, 'awilson5'),
('drone2', 'pub', 20, 2, 'tmccall5'),
('drone1', 'krg', 15, 4, 'lrodriguez5')
;

insert into orders values
('pub_303', '2021-05-23', 'drone1', 'pub', 'sprince6'),
('krg_217', '2021-05-23', 'drone1', 'krg', 'jstone5'),
('pub_306', '2021-05-22', 'drone2', 'pub', 'awilson5'),
('pub_305', '2021-05-22', 'drone2', 'pub', 'sprince6')
;

insert into product values
('ap_9T25E36L', 'antipasto platter', 4),
('pr_3C6A9R', 'pot roast', 6),
('hs_5E7L23M', 'hoagie sandwich', 3),
('clc_4T9U25X', 'chocolate lava cake', 5),
('ss_2D4E6L', 'shrimp salad', 3)
;

insert into contain values
('ap_9T25E36L', 'pub_303', 4, 1),
('pr_3C6A9R', 'krg_217', 15, 2),
('hs_5E7L23M', 'pub_306', 3, 2),
('clc_4T9U25X', 'pub_305', 3, 2),
('pr_3C6A9R', 'pub_303', 20, 1),
('ap_9T25E36L', 'pub_306', 10, 1)
;

insert into employ values
('eross10', 'pub'),
('hstark16', 'pub'),
('echarles19', 'krg'),
('eross10', 'krg')
;
