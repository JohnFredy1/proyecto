import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Duenolocal, DuenolocalRelations} from '../models';

export class DuenolocalRepository extends DefaultCrudRepository<
  Duenolocal,
  typeof Duenolocal.prototype.idpersona,
  DuenolocalRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Duenolocal, dataSource);
  }
}
