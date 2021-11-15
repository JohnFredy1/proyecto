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
  Duenolocal,
  Vehiculo,
} from '../models';
import {DuenolocalRepository} from '../repositories';

export class DuenolocalVehiculoController {
  constructor(
    @repository(DuenolocalRepository) protected duenolocalRepository: DuenolocalRepository,
  ) { }

  @get('/duenolocals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Duenolocal has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.duenolocalRepository.vehiculos(id).find(filter);
  }

  @post('/duenolocals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Duenolocal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Duenolocal.prototype.idpersona,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInDuenolocal',
            exclude: ['id'],
            optional: ['duenolocalId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.duenolocalRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/duenolocals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Duenolocal.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenolocalRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/duenolocals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Duenolocal.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenolocalRepository.vehiculos(id).delete(where);
  }
}
