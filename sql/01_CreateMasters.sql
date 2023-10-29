CREATE TABLE ProductMaster
(
	id INT IDENTITY(1,1),
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	title VARCHAR(150) NOT NULL,
	description VARCHAR(500) NOT NULL,
	created_by CHAR(50) NOT NULL,
	modified_by CHAR(50) NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id)
)

CREATE TABLE CategoryMaster
(
	id INT IDENTITY(1,1),
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	title VARCHAR(150) NOT NULL,
	created_by CHAR(50) NOT NULL,
	modified_by CHAR(50) NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id)
)

CREATE TABLE DiscountMaster
(
	id INT IDENTITY(1,1),
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	discount_type CHAR(1) NOT NULL,
	value INT NOT NULL,
	eff_from DATETIME NOT NULL,
	eff_to DATETIME NOT NULL,
	used BIT NULL,
	created_by CHAR(50) NOT NULL,
	modified_by CHAR(50) NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id)
)

CREATE TABLE ProductCategoryLink
(
	id INT IDENTITY(1,1),
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	product_id INT NOT NULL,
	category_id INT NOT NULL,
	created_by CHAR(50) NOT NULL,
	modified_by CHAR(50) NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (product_id) REFERENCES ProductMaster(id),
	FOREIGN KEY (category_id) REFERENCES CategoryMaster(id)
)

CREATE TABLE ProductVariants
(
	id INT IDENTITY(1,1),
	product_id INT NOT NULL,
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	description VARCHAR(500) NOT NULL,
	unit CHAR(10) NOT NULL,
	volume INT NOT NULL,
	in_stocks INT NOT NULL,
	price NUMERIC(18,2) NOT NULL,
	is_default BIT NULL,
	discount_id INT NULL,
	created_by CHAR(50) NOT NULL,
	modified_by CHAR(50) NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (product_id) REFERENCES ProductMaster(id),
	FOREIGN KEY (discount_id) REFERENCES DiscountMaster(id)
)



