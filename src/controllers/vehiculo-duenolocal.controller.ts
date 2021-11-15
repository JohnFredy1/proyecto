import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Duenolocal,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoDuenolocalController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/duenolocal', {
    responses: {
      '200': {
        description: 'Duenolocal belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Duenolocal)},
          },
        },
      },
    },
  })
  async getDuenolocal(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Duenolocal> {
    return this.vehiculoRepository.duenovehiculo(id);
  }
}
