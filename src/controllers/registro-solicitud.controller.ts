import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Registro,
  Solicitud,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroSolicitudController {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Registro.prototype.id,
  ): Promise<Solicitud> {
    return this.registroRepository.registrosolicitud(id);
  }
}
