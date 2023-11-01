CREATE TABLE YH_Cart
(
	Id INT IDENTITY(1,1),
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	SessionId VARCHAR(150) NOT NULL,
	ProductVariantId_FK INT NOT NULL,
	Quantity SMALLINT NOT NULL,
	CreatedDt DATETIME DEFAULT GETUTCDATE(),
	ModifiedDt DATETIME NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (ProductVariantId_FK) REFERENCES YH_ProductVariants(Id),
)

create unique index unq_Cart_product_variant_id_session_id on YH_Cart(SessionId, ProductVariantId_FK);
