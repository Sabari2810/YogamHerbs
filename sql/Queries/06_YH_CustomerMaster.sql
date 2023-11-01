
IF OBJECT_ID('YH_CustomerMaster') IS NOT NULL
BEGIN
	DROP TABLE YH_CustomerMaster
END
GO

CREATE TABLE YH_CustomerMaster (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1),
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	EMail VARCHAR(150) NOT NULL,
	MobileNo VARCHAR(10) NOT NULL,
	
	SingInOpt VARCHAR(10) NULL, -- Via Google, Mobile, EMail
	CreatedBy CHAR(50) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy CHAR(50), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Michael', 'Johnson', 'michael.johnson@example.com', '4567890123', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Emily', 'Wilson', 'emily.wilson@example.com', '7890123456', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('William', 'Brown', 'william.brown@example.com', '2345678901', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Olivia', 'Lee', 'olivia.lee@example.com', '5678901234', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('James', 'Wilson', 'james.wilson@example.com', '8901234567', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Sophia', 'Smith', 'sophia.smith@example.com', '3456789012', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Liam', 'Davis', 'liam.davis@example.com', '6789012345', 'Admin');

INSERT INTO YH_CustomerMaster (FirstName, LastName, EMail, MobileNo, CreatedBy)
VALUES ('Ava', 'Anderson', 'ava.anderson@example.com', '9012345678', 'Admin');

SELECT *
FROM YH_CustomerMaster
