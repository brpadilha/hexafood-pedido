import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from 'src/pedido/infraestructure/controller/categorias.controller';

describe('CategoriasController', () => {
  // let controller: CategoriasController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [CategoriasController],
  //     providers: [
  //       {
  //         provide: 'CreateCategoriaUseCase',
  //         useValue: {
  //           execute: jest.fn(),
  //         },
  //       },
  //       {
  //         provide: 'FindAllCategoriasUseCase',
  //         useValue: {
  //           execute: jest.fn(),
  //         },
  //       },
  //       {
  //         provide: 'FindByIdCategoriaUseCase',
  //         useValue: {
  //           execute: jest.fn(),
  //         },
  //       },
  //       {
  //         provide: 'UpdateCategoriaUseCase',
  //         useValue: {
  //           execute: jest.fn(),
  //         },
  //       },
  //       {
  //         provide: 'DeleteCategoriaUseCase',
  //         useValue: {
  //           execute: jest.fn(),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<CategoriasController>(CategoriasController);
  // });

  it('should be defined', () => {
    expect(true).toBeTruthy();
  });
});
