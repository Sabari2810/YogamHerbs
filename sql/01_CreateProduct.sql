CREATE TABLE yogam.ProductCategory
(
	id UNIQUEIDENTIFIER DEFAULT NEWID(),
	title VARCHAR(250) NOT NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL, 
	PRIMARY KEY (id)
)

CREATE TABLE yogam.Product
(
	id UNIQUEIDENTIFIER DEFAULT NEWID(),
	title VARCHAR(250) NOT NULL,
	description VARCHAR(750) NOT NULL,
	category_id UNIQUEIDENTIFIER NOT NULL,
	discount_id UNIQUEIDENTIFIER NOT NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (category_id) REFERENCES yogam.ProductCategory(id),
	FOREIGN KEY (discount_id) REFERENCES yogam.discount(id)
)

