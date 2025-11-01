CREATE TABLE Users(
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName  VARCHAR(100) NOT NULL UNIQUE,
    phoneNumber VARCHAR(15) NOT NULL UNIQUE,
    emailAddress  VARCHAR(100) NOT NULL UNIQUE,
    passwordHash VARCHAR(100) NOT NULL,
    profileImage VARCHAR(100),
    userRole VARCHAR(10) NOT NULL DEFAULT 'User',
    createdOn DATETIME2 DEFAULT SYSDATETIME(),
    updatedOn DATETIME2 DEFAULT SYSDATETIME()        
)

INSERT INTO Users(firstName,lastName,userName,phoneNumber,emailAddress,passwordHash)
VALUES('Brian','Kibiwott','Tanui','0718105315','bk.kibiwott@gmail.com','Tanui1234')


SELECT * FROM Users;