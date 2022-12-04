insert into user values('testcustomer@nyu.edu', 'Test Customer 1', '81dc9bdb52d04dc20036dbd8313ed055', '1555', 'Jay St', 'Brooklyn', 'New York');
insert into user values('user1@nyu.edu', 'User 1', '81dc9bdb52d04dc20036dbd8313ed055', '5405', 'Jay Street', 'Brooklyn', 'New York');
insert into user values('user2@nyu.edu', 'User 2', '81dc9bdb52d04dc20036dbd8313ed055', '1702', 'Jay Street', 'Brooklyn', 'New York');
insert into user values('user3@nyu.edu', 'User 3', '81dc9bdb52d04dc20036dbd8313ed055', '1890', 'Jay Street', 'Brooklyn', 'New York');

insert into package values(25, '311', 'Jay St', 'Brooklyn', 'New York');
insert into package values(24, '251', 'Palm St', 'Miami', 'Florida');
insert into package values(29, '251', '14 St', 'Manhattan', 'New York');

insert into user_package values('testcustomer@nyu.edu', 25, '2022-06-12 13:25:25');
insert into user_package values('testcustomer@nyu.edu', 24, '2022-07-12 13:25:25');

insert into user_package values('user1@nyu.edu', 25, '2022-06-10 13:25:25');
insert into user_package values('user1@nyu.edu', 29, '2022-06-12 13:25:25');


