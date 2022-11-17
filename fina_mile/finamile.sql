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