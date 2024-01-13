import { OutPutPagamentoDto } from "../usecases/pagamento/pagamentoDto";

export class PagamentoProcessadoEvent {
  constructor(public pagamento: OutPutPagamentoDto) { }
}

