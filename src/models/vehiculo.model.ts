import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Duenolocal} from './duenolocal.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  estadovisual: string;

  @property({
    type: 'number',
    required: true,
  })
  numerosoat: number;

  @property({
    type: 'string',
    required: true,
  })
  idpersona: string;

  @belongsTo(() => Cliente, {name: 'clientevehiculo'})
  vehiculocliente: string;

  @belongsTo(() => Duenolocal, {name: 'duenovehiculo'})
  vehiculodueno: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  duenolocalId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
