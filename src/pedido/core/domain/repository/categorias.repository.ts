import { Categoria } from 'src/pedido/core/domain/entity/categoria.entity';
import { InputCategoriaDto, OutputCategoriaDto } from '../../application/usecases/categoriaUseCases/categoria.dto';

export const ICategoriasRepository = 'ICategoriasRepository';

export interface ICategoriasRepository {
  create(createCategoriaDto: Categoria);

  // findOne(id : number);

  findAll(): Promise<OutputCategoriaDto[]>;

  // update(id: number, updateCategoriaDto: InputCategoriaDto);

  // remove(id: number);

  existsByName(name: string) : Promise<boolean>;

}
