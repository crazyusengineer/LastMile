CREATE TABLE users(
	email VARCHAR(256),
	name VARCHAR(256),
	pwd VARCHAR(256),
	building_number varchar(50),
	street varchar(50),
	city varchar(50),
	state varchar(50),
	PRIMARY KEY (email)	
);

CREATE TABLE package(
	packageId INT NOT NULL,
	building_number varchar(50),
	street varchar(50),
	city varchar(50),
	state varchar(50),
	PRIMARY KEY (packageId)
);

CREATE TABLE users_package(
	email VARCHAR(256),
	packageId INT,
	preference VARCHAR(256),
	requestTime TIMESTAMP DEFAULT now(), 
	PRIMARY KEY (email, packageId),	
	FOREIGN KEY (email)
		REFERENCES users (email),
	FOREIGN KEY (packageId)
		REFERENCES package (packageId)
);