import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Cliente,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaClienteController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Cliente> {
    return this.personaRepository.cliente(id);
  }
}
