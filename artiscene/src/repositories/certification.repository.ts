import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Certification} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificationRepository extends DefaultCrudRepository<
  Certification,
  typeof Certification.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Certification, dataSource);
  }
}
