IF OBJECT_ID('YH_CategoryMaster') IS NOT NULL
BEGIN
	DROP TABLE YH_CategoryMaster
END
GO

CREATE TABLE YH_CategoryMaster (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1),
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	Title VARCHAR(150) NOT NULL, 
	StatFlag CHAR(1) NOT NULL, 
	CreatedBy VARCHAR(100) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy VARCHAR(100), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Herbal Supplements', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Organic Teas', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Immunity Boosters', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Stress Relief', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Digestive Health', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Skin Care', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Energy Boosters', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Natural Remedies', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Healthy Drinks', 'L', 'ADMIN');

INSERT INTO YH_CategoryMaster (Title, StatFlag, CreatedBy)
VALUES ('Detox Products', 'L', 'ADMIN');

SELECT *
FROM YH_CategoryMaster
