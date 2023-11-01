IF OBJECT_ID('YH_CustomerAddressMaster') IS NOT NULL
BEGIN
	DROP TABLE YH_CustomerAddressMaster
END
GO

CREATE TABLE YH_CustomerAddressMaster (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1), 
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	CustomerId_FK INT NOT NULL FOREIGN KEY REFERENCES YH_CustomerMaster(Id), 
	AddressTitle VARCHAR(100) NOT NULL,
	AddressType CHAR (1) NOT NULL,
	Address1 VARCHAR (200) NOT NULL,
	Address2 VARCHAR (200) NOT NULL,
	City VARCHAR (100) NOT NULL,
	State VARCHAR (100) NOT NULL,
	Pincode INT NOT NULL,
	CreatedBy CHAR(50) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy CHAR(50), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_CustomerAddressMaster (CustomerId_FK, AddressTitle, AddressType, Address1, Address2, City, State, Pincode, CreatedBy)
VALUES (1, 'Home', 'P', '123 Main Street', 'Apt 101', 'New York', 'NY', 10001, 'Admin');

INSERT INTO YH_CustomerAddressMaster (CustomerId_FK, AddressTitle, AddressType, Address1, Address2, City, State, Pincode, CreatedBy)
VALUES (1, 'Work', 'O', '456 Business Avenue', 'Suite 301', 'New York', 'NY', 10002, 'Admin');

INSERT INTO YH_CustomerAddressMaster (CustomerId_FK, AddressTitle, AddressType, Address1, Address2, City, State, Pincode, CreatedBy)
VALUES (2, 'Home', 'P', '789 Elm Street', '', 'Los Angeles', 'CA', 90001, 'Admin');

INSERT INTO YH_CustomerAddressMaster (CustomerId_FK, AddressTitle, AddressType, Address1, Address2, City, State, Pincode, CreatedBy)
VALUES (3, 'Home', 'P', '101 Oak Avenue', '', 'Chicago', 'IL', 60001, 'Admin');

SELECT *
FROM YH_CustomerAddressMaster
