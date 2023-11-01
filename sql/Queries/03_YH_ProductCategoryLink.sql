IF OBJECT_ID('YH_ProductCategoryLink') IS NOT NULL
BEGIN
	DROP TABLE YH_ProductCategoryLink
END
GO

CREATE TABLE YH_ProductCategoryLink (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1), 
	ProductId_FK INT NOT NULL FOREIGN KEY REFERENCES YH_ProductMaster(Id), 
	CategoryId_FK INT NOT NULL FOREIGN KEY REFERENCES YH_CategoryMaster(Id), 
	CreatedBy CHAR(50) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy CHAR(50), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_ProductCategoryLink (ProductId_FK, CategoryId_FK, CreatedBy)
SELECT A.Id AS ProductId_FK, B.Id AS CategoryId_FK, 'Admin' AS CreatedBy
FROM YH_ProductMaster A
INNER JOIN YH_CategoryMaster B ON A.Id = B.Id

UNION ALL

SELECT 1, 3, 'Admin'

UNION ALL

SELECT 2, 5, 'Admin'

UNION ALL

SELECT 3, 7, 'Admin'

SELECT *
FROM YH_ProductCategoryLink
