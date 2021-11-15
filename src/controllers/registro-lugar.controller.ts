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
  Lugar,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroLugarController {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/lugar', {
    responses: {
      '200': {
        description: 'Lugar belonging to Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lugar)},
          },
        },
      },
    },
  })
  async getLugar(
    @param.path.string('id') id: typeof Registro.prototype.id,
  ): Promise<Lugar> {
    return this.registroRepository.lugarregistro(id);
  }
}
