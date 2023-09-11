DROP TABLE yogam.ProductVariant
CREATE TABLE yogam.ProductVariant
(
	id UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL,
	title VARCHAR(250) NOT NULL,
	product_id UNIQUEIDENTIFIER NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	created_date DATETIME DEFAULT GETUTCDATE() NOT NULL,
	updated_date DATETIME NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(product_id) REFERENCES yogam.Product(id)
)