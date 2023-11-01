
IF OBJECT_ID('YH_ProductMaster') IS NOT NULL
BEGIN
	DROP TABLE YH_ProductMaster
END
GO

CREATE TABLE YH_ProductMaster (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1),
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),
	Title VARCHAR(150) NOT NULL, 
	Descr VARCHAR(500) NOT NULL, 
	StatFlag CHAR(1) NOT NULL, 
	CreatedBy VARCHAR(100) NOT NULL, 
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(), 
	ModifiedBy VARCHAR(100), 
	ModifiedDt DATETIME
	);
GO

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Organic Turmeric Capsules', 
	'Our organic turmeric capsules are a natural way to support joint health and reduce inflammation. Made from high-quality turmeric root, these capsules are a convenient and effective addition to your daily wellness routine.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Herbal Tea Blend for Digestion', 
	'Our herbal tea blend features a carefully selected mix of ginger, peppermint, and fennel to aid digestion and soothe your stomach. Enjoy a cup after meals for a gentle, natural digestive boost.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Echinacea Immune Support', 
	'Boost your immune system with our Echinacea extract. This herbal remedy is designed to strengthen your body''s natural defenses and help you stay healthy year-round. Trust in the power of nature.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Ashwagandha Stress Relief', 
	'Experience relaxation and stress relief with our Ashwagandha supplement. Derived from the adaptogenic herb, Ashwagandha, these capsules promote a sense of calm and well-being, naturally.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Chamomile Sleep Aid Tea', 
	'Unwind and improve your sleep with our Chamomile Sleep Aid Tea. This soothing herbal blend calms the mind and relaxes the body, making it easier to fall asleep naturally and wake up refreshed.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Ginseng Energy Booster', 
	'Revitalize your energy levels with our Ginseng Energy Booster. This herbal supplement harnesses the power of Panax Ginseng to provide a natural and sustained energy lift throughout the day.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Hibiscus Blood Pressure Support', 
	'Support healthy blood pressure with our Hibiscus extract. This herbal remedy contains antioxidants and compounds that can help maintain blood pressure levels within a healthy range.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Milk Thistle Liver Detox', 
	'Promote liver health and detoxification with Milk Thistle. This herbal supplement is known for its liver-protective properties and can help support your body''s natural cleansing processes.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Valerian Root Anxiety Relief', 
	'Relieve anxiety and stress naturally with Valerian Root. This herbal remedy is a non-addictive and safe option to calm nervousness and restlessness, promoting a sense of tranquility.'
	, 'L', 'Admin'
	);

INSERT INTO YH_ProductMaster (Title, Descr, StatFlag, CreatedBy)
VALUES (
	'Aloe Vera Skin Soothing Gel', 
	'Experience the healing power of Aloe Vera with our skin soothing gel. This herbal remedy is perfect for sunburn, dry skin, and minor skin irritations, providing natural relief and hydration.'
	, 'L', 'Admin'
	);

SELECT *
FROM YH_ProductMaster