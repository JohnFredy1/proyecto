import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Duenolocal extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idlocal: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
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

  constructor(data?: Partial<Duenolocal>) {
    super(data);
  }
}

export interface DuenolocalRelations {
  // describe navigational properties here
}

export type DuenolocalWithRelations = Duenolocal & DuenolocalRelations;
