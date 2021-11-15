import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  Registro,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRegistroController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/registros', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Registro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Registro>,
  ): Promise<Registro[]> {
    return this.solicitudRepository.registrosolicitud(id).find(filter);
  }

  @post('/solicituds/{id}/registros', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.solicitudRepository.registrosolicitud(id).create(registro);
  }

  @patch('/solicituds/{id}/registros', {
    responses: {
      '200': {
        description: 'Solicitud.Registro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {partial: true}),
        },
      },
    })
    registro: Partial<Registro>,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.solicitudRepository.registrosolicitud(id).patch(registro, where);
  }

  @del('/solicituds/{id}/registros', {
    responses: {
      '200': {
        description: 'Solicitud.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.solicitudRepository.registrosolicitud(id).delete(where);
  }
}
