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
import {Contract} from '../models';
import {ContractRepository} from '../repositories';

export class ContractController {
  constructor(
    @repository(ContractRepository)
    public contractRepository : ContractRepository,
  ) {}

  @post('/contracts', {
    responses: {
      '200': {
        description: 'Contract model instance',
        content: {'application/json': {'x-ts-type': Contract}},
      },
    },
  })
  async create(@requestBody() contract: Contract): Promise<Contract> {
    return await this.contractRepository.create(contract);
  }

  @get('/contracts/count', {
    responses: {
      '200': {
        description: 'Contract model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where,
  ): Promise<Count> {
    return await this.contractRepository.count(where);
  }

  @get('/contracts', {
    responses: {
      '200': {
        description: 'Array of Contract model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Contract}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Contract)) filter?: Filter,
  ): Promise<Contract[]> {
    return await this.contractRepository.find(filter);
  }

  @patch('/contracts', {
    responses: {
      '200': {
        description: 'Contract PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() contract: Contract,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where,
  ): Promise<Count> {
    return await this.contractRepository.updateAll(contract, where);
  }

  @get('/contracts/{id}', {
    responses: {
      '200': {
        description: 'Contract model instance',
        content: {'application/json': {'x-ts-type': Contract}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Contract> {
    return await this.contractRepository.findById(id);
  }

  @patch('/contracts/{id}', {
    responses: {
      '204': {
        description: 'Contract PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() contract: Contract,
  ): Promise<void> {
    await this.contractRepository.updateById(id, contract);
  }

  @del('/contracts/{id}', {
    responses: {
      '204': {
        description: 'Contract DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contractRepository.deleteById(id);
  }
}
