create table if not exists items(
  id int auto_increment,
  name varchar(255) not null,
  qty int default 0,
  amount int default 0,
  primary key (id)
);
