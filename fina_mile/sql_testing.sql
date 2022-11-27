CREATE TABLE users(
	userId INT PRIMARY KEY,
	userName VARCHAR(256),
	email VARCHAR(256),
	pwd VARCHAR(256),
	address VARCHAR(256)
);

CREATE TABLE package(
	userId INT NOT NULL,
	pkgId INT NOT NULL,
	origin VARCHAR(256),
	status VARCHAR(50),
	PRIMARY KEY (userId, pkgId),	
	FOREIGN KEY (userId)
		REFERENCES users (userId)
);
INSERT INTO users (userId, userName, email, pwd, address) VALUES (8964,'xijinping','xijinping@gmail.com','xijinpingwansui','beijing');
INSERT INTO package (userId,pkgId,origin,status) VALUES (8964,9547,'changchun','Delivered');

INSERT INTO users (userId, userName, email, pwd, address) VALUES (1,'a','a@gmail.com','abcde','Brooklyn');
INSERT INTO package (userId,pkgId,origin,status) VALUES (1,2,'moscow','Stopped');

INSERT INTO users (userId, userName, email, pwd, address) VALUES (1234,'abde','abcd@gmail.com','dcba','New York');
INSERT INTO package (userId,pkgId,origin,status) VALUES (1234,4321,'NYU','Shipped');

