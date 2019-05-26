import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import { Proposal } from '../models';
import { ProposalRepository } from '../repositories';

export class ProposalController {
  constructor(
    @repository(ProposalRepository)
    public proposalRepository: ProposalRepository,
  ) { }

  @post('/proposals', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: { 'application/json': { 'x-ts-type': Proposal } },
      },
    },
  })
  async create(@requestBody() proposal: Proposal): Promise<Proposal> {
    return await this.proposalRepository.create(proposal);
  }

  @get('/proposals/count', {
    responses: {
      '200': {
        description: 'Proposal model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Proposal)) where?: Where,
  ): Promise<Count> {
    return await this.proposalRepository.count(where);
  }

  @get('/proposals', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Proposal)) filter?: Filter,
  ): Promise<Proposal[]> {
    return await this.proposalRepository.find(filter);
  }

  @get('/proposals/client/{id}', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async getAllProposals(@param.path.number('id') id: number) {
    return await this.proposalRepository.getAllProposals(id);
  }

  @get('/proposals/getProposalById/{id}', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async getProposalById(@param.path.number('id') id: number) {
    return await this.proposalRepository.getProposalById(id);
  }

  @get('/proposals/getProposalsById/{id}', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async getProposalsById(@param.path.number('id') id: number) {
    return await this.proposalRepository.getProposalsById(id);
  }

  @get('/proposals/getProposalsByJobId/{id}', {
    responses: {
      '200': {
        description: 'Array of Proposal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Proposal } },
          },
        },
      },
    },
  })
  async getProposalsByJobId(@param.path.number('id') id: number) {
    return await this.proposalRepository.getProposalsByJobId(id);
  }

  @patch('/proposals', {
    responses: {
      '200': {
        description: 'Proposal PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() proposal: Proposal,
    @param.query.object('where', getWhereSchemaFor(Proposal)) where?: Where,
  ): Promise<Count> {
    return await this.proposalRepository.updateAll(proposal, where);
  }

  @get('/proposals/{id}', {
    responses: {
      '200': {
        description: 'Proposal model instance',
        content: { 'application/json': { 'x-ts-type': Proposal } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Proposal> {
    return await this.proposalRepository.findById(id);
  }

  @patch('/proposals/{id}', {
    responses: {
      '204': {
        description: 'Proposal PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() proposal: Proposal,
  ): Promise<void> {
    await this.proposalRepository.updateById(id, proposal);
  }

  @del('/proposals/{id}', {
    responses: {
      '204': {
        description: 'Proposal DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proposalRepository.deleteById(id);
  }
}
