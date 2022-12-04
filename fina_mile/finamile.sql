CREATE TABLE user(
	name VARCHAR(256),
	email VARCHAR(256),
	pwd VARCHAR(256),
	building_number varchar(50),
	street varchar(50),
	city varchar(50),
	state varchar(50),
	PRIMARY KEY (email)	
);

CREATE TABLE user_package(
	email VARCHAR(256),
	packageId INT,
	status VARCHAR(50),
	requestTime DATETIME,
	PRIMARY KEY (email, packageId),	
	FOREIGN KEY (userId)
		REFERENCES users (userId)
	FOREIGN KEY (packageId)
		REFERENCES package (packageId)
);

CREATE TABLE package(
	packageId INT NOT NULL,
	building_number varchar(50),
	street varchar(50),
	city varchar(50),
	state varchar(50),
	PRIMARY KEY (packageId)
);