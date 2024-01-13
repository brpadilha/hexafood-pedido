import { InputPedidoDTO, OutputPedidoDTO, PedidoDTO } from '../../application/usecases/pedidoUseCase/pedido.dto';
import { Pedido } from '../entity/pedido.entity';
import { StatusPedido } from '../enum/status-pedido.enum';

export const IPedidosRepository = 'IPedidosRepository';

export interface IPedidosRepository {
  create(data: InputPedidoDTO);

  findAll(status?: StatusPedido): Promise<Pedido[]>;

  update(id: number, pedido: Pedido);

  findByStatus(status: StatusPedido);

  findById(id: number): Promise<Pedido>;

  findByCodigo(codigo_pedido: string): Promise<PedidoDTO>;

}
