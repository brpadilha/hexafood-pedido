import { Pagamento } from "../entity/pagamento.entity";

export class PagamentoFactory {
  static create(data: any): Pagamento {
    const pagamento = new Pagamento(data.id_cliente, data.id_pedido, data.id_transacao, data.descricao, data.plataforma, data.valor, data.status);
    pagamento.id = data.id || null;
    pagamento.createdAt = data.createdAt || null;
    return pagamento;
  }
}