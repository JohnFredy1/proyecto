import {Entity, model, property} from '@loopback/repository';

@model()
export class Lugar extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numerolugar: number;

  @property({
    type: 'string',
    required: true,
  })
  ancho: string;

  @property({
    type: 'string',
    required: true,
  })
  largo: string;


  constructor(data?: Partial<Lugar>) {
    super(data);
  }
}

export interface LugarRelations {
  // describe navigational properties here
}

export type LugarWithRelations = Lugar & LugarRelations;
