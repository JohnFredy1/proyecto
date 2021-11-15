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
  Persona,
} from '../models';
import {DuenolocalRepository} from '../repositories';

export class DuenolocalPersonaController {
  constructor(
    @repository(DuenolocalRepository) protected duenolocalRepository: DuenolocalRepository,
  ) { }

  @get('/duenolocals/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Duenolocal has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.duenolocalRepository.personas(id).find(filter);
  }

  @post('/duenolocals/{id}/personas', {
    responses: {
      '200': {
        description: 'Duenolocal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Duenolocal.prototype.idpersona,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInDuenolocal',
            exclude: ['id'],
            optional: ['duenolocalId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.duenolocalRepository.personas(id).create(persona);
  }

  @patch('/duenolocals/{id}/personas', {
    responses: {
      '200': {
        description: 'Duenolocal.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.duenolocalRepository.personas(id).patch(persona, where);
  }

  @del('/duenolocals/{id}/personas', {
    responses: {
      '200': {
        description: 'Duenolocal.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.duenolocalRepository.personas(id).delete(where);
  }
}
