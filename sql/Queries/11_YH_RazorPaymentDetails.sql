IF OBJECT_ID('YH_RazorPaymentDetails') IS NOT NULL
BEGIN
	DROP TABLE YH_RazorPaymentDetails
END
GO

CREATE TABLE YH_RazorPaymentDetails (
	Id INT PRIMARY KEY NOT NULL IDENTITY(1, 1),
	Guid UNIQUEIDENTIFIER DEFAULT NEWID(),

	Entity VARCHAR(100),
	Event VARCHAR(100),
	AccountId VARCHAR(100),
	GeneratedAt BIGINT,	

	-- PAYMENT DETAILS
	PaymentId VARCHAR(100),
	PaymentEntity VARCHAR(100),
	PaymentAmount NUMERIC(18,2),
	PaymentCurrency VARCHAR(100),
	PaymentStatus VARCHAR(100),
	PaymentMethod VARCHAR(100),
	PaymentOrderId VARCHAR(200),
	PaymentDescription NVARCHAR(MAX),
	PaymentInternational BIT,
	PaymentRefundStatus VARCHAR(100),
	PaymentAmountRefunded NUMERIC(18,2),
	PaymentCaptured BIT,
	PaymentEmail VARCHAR(100),
	PaymentContact VARCHAR(30),
	PaymentFee NUMERIC(18,2),
	PaymentTax NUMERIC(18,2),
	PaymentErrorCode VARCHAR(20),
	PaymentErrorDescription VARCHAR(200),
	PaymentErrorSource VARCHAR(200),
	PaymentErrorStep VARCHAR(200),
	PaymentErrorReason VARCHAR(100),
	PaymentNotes NVARCHAR(MAX),
	PaymentCreatedAt BIGINT,
	PaymentCardId VARCHAR(200),

	-- CARD DETAILS
	CardId VARCHAR(100),
	CardEntity VARCHAR(100),
	CardName VARCHAR(100),
	CardLast4 VARCHAR(4),
	CardNetwork VARCHAR(50),
	CardType VARCHAR(100),
	CardIssuer VARCHAR(100),
	CardEMI BIT,
	CardSubType VARCHAR(50),
	CardIIN VARCHAR(100),
	CardInternational BIT,

	-- UPI
	UPIPayerAccountType VARCHAR(100),
	UPIVPA VARCHAR(100),
	UPIFlow VARCHAR(100),

	-- WALLET
	Bank VARCHAR(100),
	VPA VARCHAR(100),
	Wallet VARCHAR(100),

	-- ACQUIRER DATA
	AcquirerDataRRN VARCHAR(100),
	AcquirerDataAuthRefNo VARCHAR(200),
	AcquirerDataBankTransId VARCHAR(100), 

	-- REFUND DATA
	RefundId VARCHAR(100),
	RefundEntity VARCHAR(100),
	RefundNotes NVARCHAR(MAX),
	RefundCreatedDate BIGINT,
	RefundStatus VARCHAR(50),
	RefundSpeedProcessed VARCHAR(100),
	RefundSpeedRequested VARCHAR(100),
	RefundBatchId VARCHAR(100),

	PaymentTokenId VARCHAR(100),

	PaymentFullPayload NVARCHAR(MAX),
	CreatedDt DATETIME NOT NULL DEFAULT GETDATE(),
	ModifiedDt DATETIME NULL
);