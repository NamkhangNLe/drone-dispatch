-- CS4400: Introduction to Database Systems (Spring 2024)
-- Phase III: Stored Procedures & Views [v1] Wednesday, March 27, 2024 @ 5:20pm EST

-- Team 101
-- Patrick Kim (pkim308)
-- Akash Misra (amisra43)
-- Guozhen Miao (gmiao8)
-- Hsiang-Pin Ko (hko44)
-- Namkhang Nguyen Le (lenn)

-- Directions:
-- Please follow all instructions for Phase III as listed on Canvas.
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

-- -----------------------------------------------
-- table structures
-- -----------------------------------------------

create table users (
uname varchar(40) not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
address varchar(500) not null,
birthdate date default null,
primary key (uname)
) engine = innodb;

create table customers (
uname varchar(40) not null,
rating integer not null,
credit integer not null,
primary key (uname)
) engine = innodb;

create table employees (
uname varchar(40) not null,
taxID varchar(40) not null,
service integer not null,
salary integer not null,
primary key (uname),
unique key (taxID)
) engine = innodb;

create table drone_pilots (
uname varchar(40) not null,
licenseID varchar(40) not null,
experience integer not null,
primary key (uname),
unique key (licenseID)
) engine = innodb;

create table store_workers (
uname varchar(40) not null,
primary key (uname)
) engine = innodb;

create table products (
barcode varchar(40) not null,
pname varchar(100) not null,
weight integer not null,
primary key (barcode)
) engine = innodb;

create table orders (
orderID varchar(40) not null,
sold_on date not null,
purchased_by varchar(40) not null,
carrier_store varchar(40) not null,
carrier_tag integer not null,
primary key (orderID)
) engine = innodb;

create table stores (
storeID varchar(40) not null,
sname varchar(100) not null,
revenue integer not null,
manager varchar(40) not null,
primary key (storeID)
) engine = innodb;

create table drones (
storeID varchar(40) not null,
droneTag integer not null,
capacity integer not null,
remaining_trips integer not null,
pilot varchar(40) not null,
primary key (storeID, droneTag)
) engine = innodb;

create table order_lines (
orderID varchar(40) not null,
barcode varchar(40) not null,
price integer not null,
quantity integer not null,
primary key (orderID, barcode)
) engine = innodb;

create table employed_workers (
storeID varchar(40) not null,
uname varchar(40) not null,
primary key (storeID, uname)
) engine = innodb;

-- -----------------------------------------------
-- referential structures
-- -----------------------------------------------

alter table customers add constraint fk1 foreign key (uname) references users (uname)
	on update cascade on delete cascade;
alter table employees add constraint fk2 foreign key (uname) references users (uname)
	on update cascade on delete cascade;
alter table drone_pilots add constraint fk3 foreign key (uname) references employees (uname)
	on update cascade on delete cascade;
alter table store_workers add constraint fk4 foreign key (uname) references employees (uname)
	on update cascade on delete cascade;
alter table orders add constraint fk8 foreign key (purchased_by) references customers (uname)
	on update cascade on delete cascade;
alter table orders add constraint fk9 foreign key (carrier_store, carrier_tag) references drones (storeID, droneTag)
	on update cascade on delete cascade;
alter table stores add constraint fk11 foreign key (manager) references store_workers (uname)
	on update cascade on delete cascade;
alter table drones add constraint fk5 foreign key (storeID) references stores (storeID)
	on update cascade on delete cascade;
alter table drones add constraint fk10 foreign key (pilot) references drone_pilots (uname)
	on update cascade on delete cascade;
alter table order_lines add constraint fk6 foreign key (orderID) references orders (orderID)
	on update cascade on delete cascade;
alter table order_lines add constraint fk7 foreign key (barcode) references products (barcode)
	on update cascade on delete cascade;
alter table employed_workers add constraint fk12 foreign key (storeID) references stores (storeID)
	on update cascade on delete cascade;
alter table employed_workers add constraint fk13 foreign key (uname) references store_workers (uname)
	on update cascade on delete cascade;

-- -----------------------------------------------
-- table data
-- -----------------------------------------------

insert into users values
('jstone5', 'Jared', 'Stone', '101 Five Finger Way', '1961-01-06'),
('sprince6', 'Sarah', 'Prince', '22 Peachtree Street', '1968-06-15'),
('awilson5', 'Aaron', 'Wilson', '220 Peachtree Street', '1963-11-11'),
('lrodriguez5', 'Lina', 'Rodriguez', '360 Corkscrew Circle', '1975-04-02'),
('tmccall5', 'Trey', 'McCall', '360 Corkscrew Circle', '1973-03-19'),
('eross10', 'Erica', 'Ross', '22 Peachtree Street', '1975-04-02'),
('hstark16', 'Harmon', 'Stark', '53 Tanker Top Lane', '1971-10-27'),
('echarles19', 'Ella', 'Charles', '22 Peachtree Street', '1974-05-06'),
('csoares8', 'Claire', 'Soares', '706 Living Stone Way', '1965-09-03'),
('agarcia7', 'Alejandro', 'Garcia', '710 Living Water Drive', '1966-10-29'),
('bsummers4', 'Brie', 'Summers', '5105 Dragon Star Circle', '1976-02-09'),
('cjordan5', 'Clark', 'Jordan', '77 Infinite Stars Road', '1966-06-05'),
('fprefontaine6', 'Ford', 'Prefontaine', '10 Hitch Hikers Lane', '1961-01-28');

insert into customers values
('jstone5', 4, 40),
('sprince6', 5, 30),
('awilson5', 2, 100),
('lrodriguez5', 4, 60),
('bsummers4', 3, 110),
('cjordan5', 3, 50);

insert into employees values
('awilson5', '111-11-1111', 9, 46000),
('lrodriguez5', '222-22-2222', 20, 58000),
('tmccall5', '333-33-3333', 29, 33000),
('eross10', '444-44-4444', 10, 61000),
('hstark16', '555-55-5555', 20, 59000),
('echarles19', '777-77-7777', 3, 27000),
('csoares8', '888-88-8888', 26, 57000),
('agarcia7', '999-99-9999', 24, 41000),
('bsummers4', '000-00-0000', 17, 35000),
('fprefontaine6', '121-21-2121', 5, 20000);

insert into store_workers values
('eross10'),
('hstark16'),
('echarles19');

insert into stores values
('pub', 'Publix', 200, 'hstark16'),
('krg', 'Kroger', 300, 'echarles19');

insert into employed_workers values
('pub', 'eross10'),
('pub', 'hstark16'),
('krg', 'eross10'),
('krg', 'echarles19');

insert into drone_pilots values
('awilson5', '314159', 41),
('lrodriguez5', '287182', 67),
('tmccall5', '181633', 10),
('agarcia7', '610623', 38),
('bsummers4', '411911', 35),
('fprefontaine6', '657483', 2);

insert into drones values
('pub', 1, 10, 3, 'awilson5'),
('pub', 2, 20, 2, 'lrodriguez5'),
('krg', 1, 15, 4, 'tmccall5'),
('pub', 9, 45, 1, 'fprefontaine6');

insert into products values
('pr_3C6A9R', 'pot roast', 6),
('ss_2D4E6L', 'shrimp salad', 3),
('hs_5E7L23M', 'hoagie sandwich', 3),
('clc_4T9U25X', 'chocolate lava cake', 5),
('ap_9T25E36L', 'antipasto platter', 4);

insert into orders values
('pub_303', '2024-05-23', 'sprince6', 'pub', 1),
('pub_305', '2024-05-22', 'sprince6', 'pub', 2),
('krg_217', '2024-05-23', 'jstone5', 'krg', 1),
('pub_306', '2024-05-22', 'awilson5', 'pub', 2);

insert into order_lines values
('pub_303', 'pr_3C6A9R', 20, 1),
('pub_303', 'ap_9T25E36L', 4, 1),
('pub_305', 'clc_4T9U25X', 3, 2),
('pub_306', 'hs_5E7L23M', 3, 2),
('pub_306', 'ap_9T25E36L', 10, 1),
('krg_217', 'pr_3C6A9R', 15, 2);

-- -----------------------------------------------
-- stored procedures and views
-- -----------------------------------------------

-- add customer (DONE)
delimiter // 
create procedure add_customer
	(in ip_uname varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500),
    in ip_birthdate date, in ip_rating integer, in ip_credit integer)
sp_main: begin
	-- place your solution here
    -- Insert a new customer if and only if the username will be unique.
    if ip_uname not in (select uname from users) and (ip_rating between 1 and 5) and (ip_credit >= 0) then
		insert into users values (ip_uname, ip_first_name, ip_last_name, ip_address, ip_birthdate);
        insert into customers values (ip_uname, ip_rating, ip_credit);
	end if;
end //
delimiter ;

-- add drone pilot (DONE)
delimiter // 
create procedure add_drone_pilot
	(in ip_uname varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500),
    in ip_birthdate date, in ip_taxID varchar(40), in ip_service integer, 
    in ip_salary integer, in ip_licenseID varchar(40),
    in ip_experience integer)
sp_main: begin
	-- place your solution here
    -- Create a new pilot if and only if the username, taxID, and license will be unique.
    if ip_uname not in (select uname from drone_pilots) and
	   ip_taxID not in (select taxID from employees) and
       ip_licenseID not in (select licenseID from drone_pilots) then
       
       insert into users values (ip_uname, ip_first_name, ip_last_name, ip_address, ip_birthdate);
       insert into employees values (ip_uname, ip_taxID, ip_service, ip_salary);
       insert into drone_pilots values (ip_uname, ip_licenseID, ip_experience);
	end if;
end //
delimiter ;

-- add product (DONE)
delimiter // 
create procedure add_product
	(in ip_barcode varchar(40), in ip_pname varchar(100),
    in ip_weight integer)
sp_main: begin
	-- place your solution here
    -- Create a new product if the barcode will be unique.
    if ip_barcode not in (select barcode from products) and (ip_weight >= 0) then
		insert into products values (ip_barcode, ip_pname, ip_weight);
    end if;
end //
delimiter ;

-- add drone (DONE)
delimiter // 
create procedure add_drone
	(in ip_storeID varchar(40), in ip_droneTag integer,
    in ip_capacity integer, in ip_remaining_trips integer,
    in ip_pilot varchar(40))
sp_main: begin
	-- place your solution here
    -- Create a new drone if the new drone has been purchased by a valid store and will have a unique tag at the store,
    -- and the pilot is not currently piloting a drone.
    -- Check if the pilot is already piloting a drone.
    if ip_storeID not in (select storeID from stores)
    or ip_droneTag in (select droneTag from drones where storeID = ip_storeID) 
    or ip_pilot in (select pilot from drones) or ip_pilot not in (select uname from drone_pilots)
    or ip_capacity < 0 
    or ip_remaining_trips < 0
		then leave sp_main;
    end if;
    
    insert into drones values (ip_storeID, ip_droneTag, ip_capacity, ip_remaining_trips, ip_pilot);
end //
delimiter ;

-- increase customer credits (DONE)
delimiter // 
create procedure increase_customer_credits
	(in ip_uname varchar(40), in ip_money integer)
sp_main: begin
	-- place your solution here
    -- Increase a customer's credit if the proposed change to the credit is non-negative.
    # Retrieve the customer's credit
    declare customer_credit int;
    select credit into customer_credit from customers where uname = ip_uname;
    
    # Increase the credit appropriately.
    if ip_money < 0
        then leave sp_main;
    end if;

    update customers set credit = credit + ip_money
    where uname = ip_uname;
end //
delimiter ;

-- swap drone control (DONE)
delimiter // 
create procedure swap_drone_control
	(in ip_incoming_pilot varchar(40), in ip_outgoing_pilot varchar(40))
sp_main: begin
	-- place your solution here
    -- Change the pilot of a drone if and only if:
    -- Incoming pilot is a valid pilot.
    -- Incoming pilot is not currently controlling a drone.
    -- Outgoing pilot is currently controlling a drone.
    
    if ip_incoming_pilot in (select uname from drone_pilots) and
       ip_incoming_pilot not in (select pilot from drones) and
       ip_outgoing_pilot in (select pilot from drones)
    then
		update drones set pilot = ip_incoming_pilot where pilot = ip_outgoing_pilot;
	end if;
    
end //
delimiter ;

-- repair and refuel a drone (DONE)
delimiter // 
create procedure repair_refuel_drone
	(in ip_drone_store varchar(40), in ip_drone_tag integer,
    in ip_refueled_trips integer)
sp_main: begin
	-- place your solution here
    -- Update the drone's remaining_trips if and only if the proposed change in non-negative.
    if ip_refueled_trips >= 0 and
	   ip_drone_store in (select storeID from drones) and
	   ip_drone_tag in (select droneTag from drones)
   then
	   update drones set remaining_trips = remaining_trips + ip_refueled_trips
       where (storeID = ip_drone_store) and (droneTag = ip_drone_tag);
    end if;
end //
delimiter ;

-- begin order (DONE)
delimiter // 
reate procedure begin_order
	(in ip_orderID varchar(40), in ip_sold_on date,
    in ip_purchased_by varchar(40), in ip_carrier_store varchar(40),
    in ip_carrier_tag integer, in ip_barcode varchar(40),
    in ip_price integer, in ip_quantity integer)
sp_main: begin
	-- place your solution here
    if ip_purchased_by in (select uname from customers)
    and ip_orderID not in (select orderID from orders)
    and (ip_carrier_tag, ip_carrier_store) in (select droneTag, storeID from drones)
    and ip_barcode in (select barcode from products) then
		
        if ip_price >= 0 and ip_quantity > 0 then

            if (ip_price * ip_quantity) <= (select credit from customers where uname = ip_purchased_by)
            and ip_quantity * (select weight from products where barcode = ip_barcode) <=
				(select capacity from drones where droneTag = ip_carrier_tag and storeID = ip_carrier_store) then

                insert into orders values (ip_orderID, ip_sold_on, ip_purchased_by, ip_carrier_store, ip_carrier_tag);
                insert into order_lines values (ip_orderID, ip_barcode, ip_price, ip_quantity);
			end if;
        end if;
    end if;
end //
delimiter ;

-- add order line (DONE)
delimiter // 
create procedure add_order_line
	(in ip_orderID varchar(40), in ip_barcode varchar(40),
    in ip_price integer, in ip_quantity integer)
sp_main: begin
	-- place your solution here
    -- Check if the orderID and product barcode are valid.
    if ip_orderID in (select orderID from orders)
    and ip_barcode in (select barcode from products)
    then
		if ip_price >= 0 and ip_quantity > 0 then
			if (ip_price * ip_quantity) + (select sum(price * quantity) from order_lines where orderID = ip_orderID) <=
			   (select credit from customers where uname = (select purchased_by from orders where orderId = ip_orderID)) then
				
                if (ip_quantity * (select weight from products where barcode = ip_barcode)) + 
				   (select sum(weight * quantity) from order_lines natural join products where orderID = ip_orderID) <=
                   (select capacity from drones where droneTag = (select carrier_tag from orders where orderID = ip_orderID) and
                   storeID = (select carrier_store from orders where orderID = ip_orderID)) then
                   
					insert into order_lines values (ip_orderID, ip_barcode, ip_price, ip_quantity);
				end if;
            end if;
        end if;
    end if;
end //
delimiter ;

-- deliver order (DONE)
delimiter // 
create procedure deliver_order
	(in ip_orderID varchar(40))
sp_main: begin
	declare money int;
	-- place your solution here
    if ip_orderID not in (select orderID from orders)
    or (select remaining_trips from drones where (storeID, droneTag) = 
    (select carrier_store, carrier_tag from orders where orderID = ip_orderID)) < 1
		then leave sp_main;
    end if;
    
    set money = (select sum(price * quantity) from order_lines where orderID = ip_orderID);
    
    if (select credit from customers 
    where uname = (select purchased_by from orders where orderID = ip_orderID)) < money
		then leave sp_main;
	end if;
    
    update customers set credit = credit - money
    where uname = (select purchased_by from orders where orderID = ip_orderID);
    
    update stores set revenue = revenue + money
    where storeID = (select carrier_store from orders where orderID = ip_orderID);
    
    update drones set remaining_trips = remaining_trips - 1
    where (storeID, droneTag) = 
    (select carrier_store, carrier_tag from orders where orderID = ip_orderID);
    
    update drone_pilots set experience = experience + 1
    where uname = (select pilot from drones where (storeID, droneTag) = 
    (select carrier_store, carrier_tag from orders where orderID = ip_orderID));
    
    if money > 25 then
		if (select rating from customers where uname = 
		(select purchased_by from orders where orderID = ip_orderID)) < 5
			then
			update customers set rating = rating + 1 
			where uname = (select purchased_by from orders where orderID = ip_orderID);
		end if;
    end if;
    
    delete from order_lines where orderID = ip_orderID;
    delete from orders where orderID = ip_orderID;
end //
delimiter ;

-- cancel an order (DONE)
delimiter // 
create procedure cancel_order
	(in ip_orderID varchar(40))
sp_main: begin
	-- place your solution here
    if ip_orderID not in (select orderID from orders)
		then leave sp_main;
    end if;
    
    if (select rating from customers where uname = 
    (select purchased_by from orders where orderID = ip_orderID)) > 1
		then
        update customers set rating = rating - 1
		where uname = (select purchased_by from orders where orderID = ip_orderID);
    end if;
    
    delete from order_lines where orderID = ip_orderID;
    delete from orders where orderID = ip_orderID;
end //
delimiter ;

-- display persons distribution across roles
create or replace view role_distribution (category, total) as
-- replace this select query with your solution
-- Display the number of users in the following roles:
-- all users
-- customers, employees, and those who are both customers and employees
-- drone pilots, store workers, and employees in other roles
select 'users', count(*) from users
union
select 'customers', count(*) from customers
union
select 'employees', count(*) from employees
union
select 'customer_employer_overlap', count(*) from employees natural join customers
union
select 'drone_pilots', count(*) from drone_pilots
union
select 'store_workers', count(*) from store_workers
union
select 'other_employee_roles', X.employ - Z.total 
from (select count(*) as employ from employees) as X, 
(select count(*) as total from (select uname from drone_pilots union select uname from store_workers) as Y) as Z;


-- display customer status and current credit and spending activity
create or replace view customer_credit_check (customer_name, rating, current_credit,
	credit_already_allocated) as
-- replace this select query with your solution
select uname, rating, credit, coalesce(credit_already_allocated, 0)
from customers left join
(select purchased_by, sum((price * quantity)) as credit_already_allocated
 from orders natural join order_lines group by purchased_by) as temp
on customers.uname = temp.purchased_by;

-- display drone status and current activity
create or replace view drone_traffic_control (drone_serves_store, drone_tag, pilot,
	total_weight_allowed, current_weight, deliveries_allowed, deliveries_in_progress) as
-- replace this select query with your solution
select storeID, droneTag, pilot, capacity, coalesce(sum(Y.total_weight), 0), remaining_trips, count(X.orderID)
from (select * from drones left join orders on (storeID, droneTag) = (carrier_store, carrier_tag)) as X
left join (select orderID, sum(quantity * weight) as total_weight
		   from (orders natural join order_lines)
           natural join products group by orderID) as Y
on X.orderID = Y.orderID
group by storeID, droneTag;

-- display product status and current activity including most popular products
create or replace view most_popular_products (barcode, product_name, weight, lowest_price,
	highest_price, lowest_quantity, highest_quantity, total_quantity) as
-- replace this select query with your solution
select products.barcode, pname, weight, min(price), max(price),
coalesce(min(quantity), 0), coalesce(max(quantity), 0), coalesce(sum(quantity), 0)
from products left join order_lines on products.barcode = order_lines.barcode group by products.barcode;


-- display drone pilot status and current activity including experience
create or replace view drone_pilot_roster (pilot, licenseID, drone_serves_store,
	drone_tag, successful_deliveries, pending_deliveries) as
-- replace this select query with your solution
select uname as pilot, licenseID, storeID as drone_serves_store, droneTag as drone_tag, experience as successful_deliveries,
	   coalesce(x.pending_deliveries, 0) as pending_delivieres	   
from drone_pilots
left join
drones on drone_pilots.uname = drones.pilot
left join
(select pilot, count(*) as pending_deliveries
 from drones join orders on (storeID, droneTag) = (carrier_store, carrier_tag)
 group by pilot) as X on drone_pilots.uname = X.pilot;

-- display store revenue and activity
create or replace view store_sales_overview (store_id, sname, manager, revenue,
	incoming_revenue, incoming_orders) as
-- replace this select query with your solution
select storeID, sname, manager, revenue, coalesce(X.incoming_revenue, 0), coalesce(Y.incoming_orders, 0)
from stores
join
(select orders.carrier_store as carrierID, sum(price * quantity) as incoming_revenue
 from order_lines
 join orders
 on order_lines.orderID = orders.orderID
 group by orders.carrier_store) as X
on stores.storeID = X.carrierID
join
(select carrier_store, count(*) as incoming_orders from orders group by carrier_store) as Y
on stores.storeID = Y.carrier_store;

-- display the current orders that are being placed/in progress
create or replace view orders_in_progress (orderID, cost, num_products, payload,
	contents) as
-- replace this select query with your solution
select orderID, sum(price * quantity), count(barcode), sum(weight * quantity), group_concat(pname)
from orders as X natural join (select * from order_lines natural join products) as Y
group by orderID;

-- remove customer
delimiter // 
create procedure remove_customer
	(in ip_uname varchar(40))
sp_main: begin
	-- place your solution here
    -- Remove a customer if the customer doesn't have any pending orders.
    if (ip_uname not in (select purchased_by from orders)) then
		# The customer doesn't have any pending orders.
        delete from customers where uname = ip_uname;
        if (ip_uname not in (select uname from employees)) then
			# The customer isn't an employee, so delete it from the database.
            delete from users where uname = ip_uname;
		end if;
	end if;
end //
delimiter ;

-- remove drone pilot
delimiter // 
create procedure remove_drone_pilot
	(in ip_uname varchar(40))
sp_main: begin
	-- place your solution here
    if ip_uname not in (select pilot from drones) then
		delete from employees where uname = ip_uname;
		delete from drone_pilots where uname = ip_uname;
	if ip_uname not in (select uname from customers) then
		delete from users where uname = ip_uname;
   	end if;
end if;

end //
delimiter ;

-- remove product
delimiter // 
create procedure remove_product
	(in ip_barcode varchar(40))
sp_main: begin
	-- place your solution here
    if ip_barcode not in (select barcode from order_lines) then
		delete from products where barcode = ip_barcode;
	end if;

end //
delimiter ;

-- remove drone
delimiter // 
create procedure remove_drone
	(in ip_storeID varchar(40), in ip_droneTag integer)
sp_main: begin
	-- place your solution here
    if (ip_storeID, ip_droneTag) in (select carrier_store, carrier_tag from orders) then
		leave sp_main;
    end if;
    
    delete from drones where (ip_storeID, ip_droneTag) = (storeID, droneTag);
end //
delimiter ;
