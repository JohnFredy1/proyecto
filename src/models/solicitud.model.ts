import {Entity, model, property, hasMany} from '@loopback/repository';
import {Registro} from './registro.model';

@model()
export class Solicitud extends Entity {
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
  idpersona: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'date',
    required: true,
  })
  fechavisita: string;

  @property({
    type: 'string',
    required: true,
  })
  lugarasignado: string;

  @hasMany(() => Registro)
  registrosolicitud: Registro[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
