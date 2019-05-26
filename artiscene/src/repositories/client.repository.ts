import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Client} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Client, dataSource);
  }
}
