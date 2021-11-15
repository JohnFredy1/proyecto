import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idpersona: string;

  @property({
    type: 'string',
    required: true,
  })
  idvehiculo: string;

  @hasMany(() => Persona)
  personas: Persona[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
