import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Contract} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Contract, dataSource);
  }
}
