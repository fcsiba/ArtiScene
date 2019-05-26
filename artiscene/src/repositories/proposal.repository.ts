import { DefaultCrudRepository, juggler, repository } from '@loopback/repository';
import { Proposal, Job, JobsResult } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { JobRepository } from './job.repository';

export class ProposalRepository extends DefaultCrudRepository<
  Proposal,
  typeof Proposal.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository(JobRepository) protected jobRepository: JobRepository,
  ) {
    super(Proposal, dataSource);
  }

  async getAllProposals(userId: number) {
    var count = 0;

    const jobs = await this.jobRepository.find({ where: { client_id: userId } });
    return await this.getJobs(jobs);


  }

  async getProposalsByJobId(id: number) {
    return await this.find({ where: { job_id: id } });
  }

  async getProposalsById(id: number) {
    return await this.find({ where: { artist_id: id } });
  }

  async getJobs(jobs: Job[]) {
    const result = [new JobsResult];
    return await jobs


    const _ = await jobs.forEach((value, index) => {
      var jobResult = new JobsResult();
      jobResult.job = value;
      if (value.id !== null) {
        // const prop = await this.find({ where: { job_id: value.id } });
        // jobResult.proposals = prop;
        // console.log('result', jobResult);
        // await result.push(jobResult);
        // console.log('result', result);
      }
      // if (index === 0) {

      // }
    });
    return result
  }

  async getProposalById(id: number) {
    const proposal = await this.findOne({ where: { id: id } });
    if (proposal === null) {
      return {
        "response": "Nothing found"
      }
    } else {
      const job = await this.jobRepository.findOne({ where: { id: proposal.job_id } });
      if (job === null) {
        return {
          "response": "Nothing found"
        }
      } else {
        job.amount
        return ({
          "job_id": job.id,
          "amount": job.amount,
          "description": job.description,
          "duration": job.duration,
          "title": job.title,
          "comment": proposal.comment

        });
      }
    }
  }

  // async getProposalById(){

  // }

}
