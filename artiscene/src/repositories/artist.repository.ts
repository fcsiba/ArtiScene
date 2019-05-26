import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Artist} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ArtistRepository extends DefaultCrudRepository<
  Artist,
  typeof Artist.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Artist, dataSource);
  }
}
