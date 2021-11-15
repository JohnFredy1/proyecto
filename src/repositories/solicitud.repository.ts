import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Registro} from '../models';
import {RegistroRepository} from './registro.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly registrosolicitud: HasManyRepositoryFactory<Registro, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(Solicitud, dataSource);
    this.registrosolicitud = this.createHasManyRepositoryFactoryFor('registrosolicitud', registroRepositoryGetter,);
    this.registerInclusionResolver('registrosolicitud', this.registrosolicitud.inclusionResolver);
  }
}
