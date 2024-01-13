type PaymentData = {
  transaction_amount: number,
  description: string,
  payment_method_id: 'pix',
  payer?: {
    email?: string,
    first_name?: string,
    last_name?: string,
    identification?: {
      type: 'CPF',
      number: string
    },
    address?: {
      zip_code: string,
      street_name: string,
      street_number: string,
      neighborhood: string,
      city: string,
      federal_unit: string,
    }
  }
}

class MercadoPagoConfigurations {
  private _accessToken: string

  constructor() { }

  public setAccessToken(token: string) {
    this._accessToken = token
  }

  public getAccessToken() {
    return this._accessToken
  }
}

// Based on the following docs:
// https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/payment-brick/payment-submission/pix#editor_2
class MercadoPagoPayment {
  constructor() { }

  public create(data: PaymentData) {
    console.log('[MERCADO PAGO MOCK API] Create payment called with: ')

    return Promise.resolve({
      "id": this.generateRandomBigInt(),
      "status": "pending",
      "status_detail": "pending_waiting_transfer",
      "transaction_details": {
        "net_received_amount": 0,
        "total_paid_amount": data.transaction_amount,
        "overpaid_amount": 0,
        "external_resource_url": null,
        "installment_amount": 0,
        "financial_institution": null
      },
      "point_of_interaction": {
        "type": "PIX",
        "sub_type": null,
        "application_data": {
          "name": "NAME_SDK",
          "version": "VERSION_NUMBER"
        },
        "transaction_data": {
          "qr_code_base64": "iVBORw0KGgoAAAANSUhEUgAABRQAAAUUCAYAAACu5p7oAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAIABJREFUeJzs2luO3LiWQNFmI+Y/Zd6vRt36KGNXi7ZOBtcagHD4kNLeiLX33v8DAAAAABD879sDAAAAAAA/h6AIAAAAAGSCIgAAAACQCYoAAAAAQCYoAgAAAACZoAgAAAAAZIIiAAAAAJAJigAAAABAJigCAAAAAJmgCAAAAABkgiIAAAAAkAmKAAAAAEAmKAIAAAAAmaAIAAAAAGSCIgAAAACQCYoAAAAAQCYoAgAAAACZoAgAAAAAZIIiAAAAAJAJigAAAABAJigCA...",
          "qr_code": "00020126600014br.gov.bcb.pix0117john@yourdomain.com0217additional data520400005303986540510.005802BR5913Maria Silva6008Brasilia62070503***6304E2CA",
          "ticket_url": "https://www.mercadopago.com.br/payments/123456789/ticket?caller_id=123456&hash=123e4567-e89b-12d3-a456-426655440000"
        }
      }
    })
  }

  //Gera um número nesse formato 5466310457
  private generateRandomBigInt(): number {
    let min = 0; // O menor número de 10 dígitos.
    let max = 999; // O maior número de 10 dígitos.

    // Geramos um número aleatório de 10 dígitos, convertemos para BigInt e retornamos.
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

}

class MercadoPago {

  payment: MercadoPagoPayment
  configurations: MercadoPagoConfigurations

  constructor() {
    this.payment = new MercadoPagoPayment()
    this.configurations = new MercadoPagoConfigurations()
  }
}

const mp = new MercadoPago()

export default mp
