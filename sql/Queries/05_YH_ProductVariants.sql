IF OBJECT_ID('YH_ProductVariants') IS NOT NULL
BEGIN
	DROP TABLE YH_ProductVariants
END
GO

CREATE TABLE YH_ProductVariants (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1), 
	DiscountId_FK INT NOT NULL FOREIGN KEY REFERENCES YH_DiscountMaster(Id),
	ProductId_FK INT NOT NULL FOREIGN KEY REFERENCES YH_ProductMaster(Id), 
	Guid UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(), --CHANGED DATA TYPE
	Descr VARCHAR (500) NOT NULL,
	MeasurementUnit CHAR(10) NOT NULL,
	Volumne INT NOT NULL,
	StockCount INT NOT NULL,
	Price NUMERIC (18,2) NOT NULL,
	IsDefault BIT NOT NULL,
	CreatedBy CHAR(50) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy CHAR(50), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_ProductVariants (DiscountId_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (1, 1, 'Variant 1 for Product 1', 'Unit', 100, 5, 19.99, 1, 'Admin');

INSERT INTO YH_ProductVariants (DiscountID_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (2, 2, 'Variant 1 for Product 2', 'Grams', 100, 75, 49.99, 1, 'Admin');
INSERT INTO YH_ProductVariants (DiscountID_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (2, 2, 'Variant 2 for Product 2', 'Grams', 200, 75, 99.99, 0, 'Admin');
INSERT INTO YH_ProductVariants (DiscountID_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (2, 2, 'Variant 3 for Product 2', 'Grams', 500, 75, 199.50, 0, 'Admin');

INSERT INTO YH_ProductVariants (DiscountID_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (3, 3, 'Variant 1 for Product 3', 'Litre', 150, 60, 24.99, 1, 'Admin');
INSERT INTO YH_ProductVariants (DiscountID_FK, ProductId_FK, Descr, MeasurementUnit, Volumne, StockCount, Price, IsDefault, CreatedBy)
VALUES (3, 3, 'Variant 2 for Product 3', 'Litre', 200, 20, 60.00, 1, 'Admin');

SELECT *
FROM YH_ProductVariants
