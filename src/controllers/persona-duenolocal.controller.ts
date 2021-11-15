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
  Duenolocal,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaDuenolocalController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/duenolocal', {
    responses: {
      '200': {
        description: 'Duenolocal belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Duenolocal)},
          },
        },
      },
    },
  })
  async getDuenolocal(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Duenolocal> {
    return this.personaRepository.duenolocal(id);
  }
}
