import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Job } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Job, dataSource);
  }


  async getJobsById(id: number): Promise<Job[]> {
    return await this.find({ where: { "client_id": id } })
  }

}
