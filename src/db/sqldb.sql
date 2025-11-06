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

ALTER TABLE Users
ADD verificationCode VARCHAR(6),
    isVerified BIT DEFAULT 0

INSERT INTO Users(firstName,lastName,userName,phoneNumber,emailAddress,passwordHash)
VALUES('Brian','Kibiwott','Tanui','0718105315','bk.kibiwott@gmail.com','Tanui1234')


SELECT * FROM Users;

CREATE TABLE Products (
    productId INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    productName VARCHAR(100) NOT NULL,
    productBrand VARCHAR(50) NOT NULL,
    productImage VARCHAR(100) NOT NULL,
    stockQuantity INT NOT NULL,
    productDescription TEXT,
    productCategory VARCHAR(50) NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL,
    createdOn DATETIME2 DEFAULT SYSDATETIME(),
    updatedOn DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (userId) REFERENCES Users(id)
)
-- DROP TABLE IF EXISTS Products;

INSERT INTO Products(userId,productName,productBrand,productImage,stockQuantity,productDescription,productCategory,productPrice)
VALUES(5,'Dell XPS 13','Dell','dellxps13.jpg',50,'A high-performance laptop with a sleek design.','Laptops',999.99)

SELECT * FROM Products;