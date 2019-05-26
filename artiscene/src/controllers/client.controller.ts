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
import {Client} from '../models';
import {ClientRepository} from '../repositories';

export class ClientController {
  constructor(
    @repository(ClientRepository)
    public clientRepository : ClientRepository,
  ) {}

  @post('/clients', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {'x-ts-type': Client}},
      },
    },
  })
  async create(@requestBody() client: Client): Promise<Client> {
    return await this.clientRepository.create(client);
  }

  @get('/clients/count', {
    responses: {
      '200': {
        description: 'Client model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where,
  ): Promise<Count> {
    return await this.clientRepository.count(where);
  }

  @get('/clients', {
    responses: {
      '200': {
        description: 'Array of Client model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Client}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Client)) filter?: Filter,
  ): Promise<Client[]> {
    return await this.clientRepository.find(filter);
  }

  @patch('/clients', {
    responses: {
      '200': {
        description: 'Client PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() client: Client,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where,
  ): Promise<Count> {
    return await this.clientRepository.updateAll(client, where);
  }

  @get('/clients/{id}', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {'x-ts-type': Client}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Client> {
    return await this.clientRepository.findById(id);
  }

  @patch('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @del('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}
