
IF OBJECT_ID('YH_DiscountMaster') IS NOT NULL
BEGIN
	DROP TABLE YH_DiscountMaster
END
GO

CREATE TABLE YH_DiscountMaster (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1), 
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	DiscountType CHAR(1) NOT NULL,
	Value NUMERIC(18,2) NOT NULL, 
	EffFrom DATETIME NOT NULL,
	EffTo DATETIME NOT NULL,
	Used BIT NULL,
	CreatedBy CHAR(50) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy CHAR(50), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('D', 10.00, '2023-11-01 00:00:00', '2023-12-01 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('C', 5.00, '2023-11-05 00:00:00', '2023-11-15 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('D', 15.00, '2023-11-10 00:00:00', '2023-11-20 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('C', 7.50, '2023-11-15 00:00:00', '2023-11-25 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('D', 20.00, '2023-11-20 00:00:00', '2023-12-01 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('C', 10.00, '2023-11-25 00:00:00', '2023-12-05 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('D', 25.00, '2023-11-30 00:00:00', '2023-12-10 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('C', 12.50, '2023-12-05 00:00:00', '2023-12-15 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('D', 30.00, '2023-12-10 00:00:00', '2023-12-20 00:00:00', 0, 'Admin');

INSERT INTO YH_DiscountMaster (DiscountType, Value, EffFrom, EffTo, Used, CreatedBy)
VALUES ('C', 15.00, '2023-12-15 00:00:00', '2023-12-25 00:00:00', 0, 'Admin');
SELECT *
FROM YH_DiscountMaster
