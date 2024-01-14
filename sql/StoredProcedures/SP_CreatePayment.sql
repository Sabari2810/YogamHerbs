CREATE OR ALTER PROCEDURE SP_CreatePayment
(
	@payment_details NVARCHAR(MAX)
)
AS
BEGIN
SELECT * INTO #tmp_payment FROM OPENJSON(@payment_details)
WITH
(
	Entity VARCHAR(100)					'$.entity',
	Event VARCHAR(100)					'$.event',
	AccountId VARCHAR(100)				'$.account_id',
	GeneratedAt BIGINT					'$.created_at',

	-- PAYMENT DETAILS
	PaymentId VARCHAR(100)				'$.payload.payment.entity.id',
	PaymentEntity VARCHAR(100)			'$.payload.payment.entity.entity',
	PaymentAmount NUMERIC(18,2)			'$.payload.payment.entity.amount',
	PaymentCurrency VARCHAR(100)		'$.payload.payment.entity.currency',
	PaymentStatus VARCHAR(100)			'$.payload.payment.entity.status',
	PaymentMethod VARCHAR(100)			'$.payload.payment.entity.method',
	PaymentOrderId VARCHAR(200)			'$.payload.payment.entity.order_id',
	PaymentDescription NVARCHAR(MAX)	'$.payload.payment.entity.description',
	PaymentInternational BIT			'$.payload.payment.entity.international',
	PaymentRefundStatus VARCHAR(100)	'$.payload.payment.entity.refund_status',
	PaymentAmountRefunded NUMERIC(18,2)	'$.payload.payment.entity.amount_refunded',
	PaymentCaptured BIT					'$.payload.payment.entity.captured',
	PaymentEmail VARCHAR(100)			'$.payload.payment.entity.email',
	PaymentContact VARCHAR(30)			'$.payload.payment.entity.contact',
	PaymentFee NUMERIC(18,2)			'$.payload.payment.entity.fee',
	PaymentTax NUMERIC(18,2)			'$.payload.payment.entity.tax',
	PaymentErrorCode VARCHAR(20)		'$.payload.payment.entity.error_code',
	PaymentErrorDescription VARCHAR(200)'$.payload.payment.entity.error_description',
	PaymentErrorSource VARCHAR(200)		'$.payload.payment.entity.error_source',
	PaymentErrorStep VARCHAR(200)		'$.payload.payment.entity.error_step',
	PaymentErrorReason VARCHAR(100)		'$.payload.payment.entity.error_reason',
	PaymentNotes NVARCHAR(MAX)			'$.payload.payment.entity.notes',
	PaymentCreatedAt BIGINT				'$.payload.payment.entity.created_at',
	PaymentCardId VARCHAR(200)			'$.payload.payment.entity.card_id',

	-- CARD DETAILS
	CardId VARCHAR(100)					'$.payload.payment.entity.card.id',
	CardEntity VARCHAR(100)				'$.payload.payment.entity.card.entity',
	CardName VARCHAR(100)				'$.payload.payment.entity.card.name',
	CardLast4 VARCHAR(4)				'$.payload.payment.entity.card.last4',
	CardNetwork VARCHAR(50)				'$.payload.payment.entity.card.network',
	CardType VARCHAR(100)				'$.payload.payment.entity.card.type',
	CardIssuer VARCHAR(100)				'$.payload.payment.entity.card.issuer',
	CardEMI BIT							'$.payload.payment.entity.card.emi',
	CardSubType VARCHAR(50)				'$.payload.payment.entity.card.sub_type',
	CardIIN VARCHAR(100)				'$.payload.payment.entity.card.iin',
	CardInternational BIT				'$.payload.payment.entity.card.international',

	-- UPI
	UPIPayerAccountType VARCHAR(100)	'$.payload.payment.entity.upi.payer_account_type',
	UPIVPA VARCHAR(100)					'$.payload.payment.entity.upi.vpa',
	UPIFlow VARCHAR(100)				'$.payload.payment.entity.upi.flow',

	-- WALLET
	Bank VARCHAR(100)					'$.payload.payment.entity.bank',
	VPA VARCHAR(100)					'$.payload.payment.entity.vpa',
	Wallet VARCHAR(100)					'$.payload.payment.entity.wallet',

	-- ACQUIRER DATA
	AcquirerDataRRN VARCHAR(100)		'$.payload.payment.entity.acquirer_data.rrn',
	AcquirerDataAuthRefNo VARCHAR(200)	'$.payload.payment.entity.acquirer_data.authentication_reference_number',
	AcquirerDataBankTransId VARCHAR(100)'$.payload.payment.entity.acquirer_data.bank_transaction_id',

	PaymentTokenId VARCHAR(100)			'$.payload.payment.entity.token_id',

	-- REFUND DATA
	RefundId VARCHAR(100)				'$.payload.refund.entity.id',
	RefundEntity VARCHAR(100)			'$.payload.refund.entity.entity',
	RefundNotes NVARCHAR(MAX)			'$.payload.refund.entity.notes',
	RefundCreatedDate BIGINT			'$.payload.refund.entity.created_at',
	RefundStatus VARCHAR(50)			'$.payload.refund.entity.status',
	RefundSpeedProcessed VARCHAR(100)	'$.payload.refund.entity.speed_processed',
	RefundSpeedRequested VARCHAR(100)	'$.payload.refund.entity.speed_requested',
	RefundBatchId VARCHAR(100)			'$.payload.refund.entity.batch_id'

)

INSERT INTO YH_RazorPaymentDetails
(
	Entity, 
	Event,
	AccountId,
	GeneratedAt,
	-- PAYMENT DETAILS
	PaymentId,
	PaymentEntity,
	PaymentAmount,
	PaymentCurrency,
	PaymentStatus,
	PaymentMethod,
	PaymentOrderId,
	PaymentDescription,
	PaymentInternational,
	PaymentRefundStatus,
	PaymentAmountRefunded,
	PaymentCaptured,
	PaymentEmail,
	PaymentContact,
	PaymentFee,
	PaymentTax,
	PaymentErrorCode,
	PaymentErrorDescription,
	PaymentErrorSource,
	PaymentErrorStep,
	PaymentErrorReason,
	PaymentNotes,
	PaymentCreatedAt,
	PaymentCardId,

	-- CARD DETAILS
	CardId,
	CardEntity,
	CardName,
	CardLast4,
	CardNetwork,
	CardType,
	CardIssuer,
	CardEMI,
	CardSubType,
	CardIIN,
	CardInternational,

	-- UPI
	UPIPayerAccountType,
	UPIVPA,
	UPIFlow,

	-- WALLET
	Bank,
	VPA,
	Wallet,

	-- ACQUIRER DATA
	AcquirerDataRRN,
	AcquirerDataAuthRefNo,
	AcquirerDataBankTransId, 

	PaymentTokenId,
	PaymentFullPayload,

	-- REFUND DATA
	RefundId,
	RefundEntity ,
	RefundNotes ,
	RefundCreatedDate ,
	RefundStatus ,
	RefundSpeedProcessed ,
	RefundSpeedRequested ,
	RefundBatchId
)


SELECT 
	Entity, 
	Event,
	AccountId,
	GeneratedAt,
	-- PAYMENT DETAILS
	PaymentId,
	PaymentEntity,
	PaymentAmount / 100,
	PaymentCurrency,
	PaymentStatus,
	PaymentMethod,
	PaymentOrderId,
	PaymentDescription,
	PaymentInternational,
	PaymentRefundStatus,
	PaymentAmountRefunded / 100,
	PaymentCaptured,
	PaymentEmail,
	PaymentContact,
	PaymentFee / 100,
	PaymentTax / 100,
	PaymentErrorCode,
	PaymentErrorDescription,
	PaymentErrorSource,
	PaymentErrorStep,
	PaymentErrorReason,
	PaymentNotes,
	PaymentCreatedAt,
	PaymentCardId,

	-- CARD DETAILS
	CardId,
	CardEntity,
	CardName,
	CardLast4,
	CardNetwork,
	CardType,
	CardIssuer,
	CardEMI,
	CardSubType,
	CardIIN,
	CardInternational,

	-- UPI
	UPIPayerAccountType,
	UPIVPA,
	UPIFlow,

	-- WALLET
	Bank,
	VPA,
	Wallet,

	-- ACQUIRER DATA
	AcquirerDataRRN,
	AcquirerDataAuthRefNo,
	AcquirerDataBankTransId, 

	PaymentTokenId,
	@payment_details, 

	-- REFUND DATA
	RefundId ,
	RefundEntity ,
	RefundNotes ,
	RefundCreatedDate ,
	RefundStatus,
	RefundSpeedProcessed ,
	RefundSpeedRequested ,
	RefundBatchId
FROM #tmp_payment

-- update order status
UPDATE yh 
	SET StatusId_FK = (SELECT TOP 1 id FROM YH_OrderStatus WHERE Status IN (
		CASE WHEN Event IN ('payment.authorized') THEN 'PAYMENT_AUTHORIZED'
		WHEN Event IN ('payment.captured') THEN 'PAYMENT_CAPTURED'
		WHEN Event IN ('payment.failed') THEN 'PAYMENT_FAILED'
		WHEN Event IN ('refund.created') THEN 'REFUND_CREATED'
		WHEN Event IN ('refund.processed') THEN 'REFUND_PROCESSED'
		WHEN Event IN ('refund.failed') THEN 'REFUND_FAILED'
		ELSE 'UNKNOWN' END
	))
FROM YH_Orders yh 
JOIN #tmp_payment razor ON yh.RazorOrderId = razor.PaymentOrderId
END