import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Lugar} from './lugar.model';

@model()
export class Registro extends Entity {
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
  plca: string;

  @property({
    type: 'date',
    required: true,
  })
  fechavisita: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo: number;

  @property({
    type: 'string',
    required: true,
  })
  lugar: string;

  @belongsTo(() => Solicitud, {name: 'registrosolicitud'})
  solicitudId: string;

  @belongsTo(() => Lugar, {name: 'lugarregistro'})
  lugarId: string;

  constructor(data?: Partial<Registro>) {
    super(data);
  }
}

export interface RegistroRelations {
  // describe navigational properties here
}

export type RegistroWithRelations = Registro & RegistroRelations;
