import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Skill} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Skill, dataSource);
  }
}
