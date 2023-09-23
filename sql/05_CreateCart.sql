CREATE TABLE yogam.Cart
(
	id UNIQUEIDENTIFIER, 
	session_id VARCHAR(150) NOT NULL,
	product_variant_id UNIQUEIDENTIFIER NOT NULL,
	quantity SMALLINT NOT NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (product_variant_id) REFERENCES yogam.ProductVariant(id),
)
