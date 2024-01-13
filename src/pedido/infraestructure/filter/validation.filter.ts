import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoriaException } from 'src/pedido/core/application/exceptions/categoria.exception';
import { ProdutoException } from 'src/pedido/core/application/exceptions/produto.exception';
import { PedidoException } from '../../core/application/exceptions/pedido.exception';

@Catch(CategoriaException, PedidoException, ProdutoException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message,
    });
  }
}
