CREATE TABLE Cart
(
	id INT IDENTITY(1,1),
	guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	session_id VARCHAR(150) NOT NULL,
	product_variant_id INT NOT NULL,
	quantity SMALLINT NOT NULL,
	created_date DATETIME DEFAULT GETUTCDATE(),
	updated_date DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (product_variant_id) REFERENCES ProductVariants(id),
)

create unique index unq_Cart_product_variant_id_session_id on Cart(session_id, product_variant_id);

