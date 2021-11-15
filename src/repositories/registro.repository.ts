import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Registro, RegistroRelations, Solicitud, Lugar} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {LugarRepository} from './lugar.repository';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {

  public readonly registrosolicitud: BelongsToAccessor<Solicitud, typeof Registro.prototype.id>;

  public readonly lugarregistro: BelongsToAccessor<Lugar, typeof Registro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('LugarRepository') protected lugarRepositoryGetter: Getter<LugarRepository>,
  ) {
    super(Registro, dataSource);
    this.lugarregistro = this.createBelongsToAccessorFor('lugarregistro', lugarRepositoryGetter,);
    this.registerInclusionResolver('lugarregistro', this.lugarregistro.inclusionResolver);
    this.registrosolicitud = this.createBelongsToAccessorFor('registrosolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('registrosolicitud', this.registrosolicitud.inclusionResolver);
  }
}
