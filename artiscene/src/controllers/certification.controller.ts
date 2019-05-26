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
import {Certification} from '../models';
import {CertificationRepository} from '../repositories';

export class CertificationController {
  constructor(
    @repository(CertificationRepository)
    public certificationRepository : CertificationRepository,
  ) {}

  @post('/certifications', {
    responses: {
      '200': {
        description: 'Certification model instance',
        content: {'application/json': {'x-ts-type': Certification}},
      },
    },
  })
  async create(@requestBody() certification: Certification): Promise<Certification> {
    return await this.certificationRepository.create(certification);
  }

  @get('/certifications/count', {
    responses: {
      '200': {
        description: 'Certification model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Certification)) where?: Where,
  ): Promise<Count> {
    return await this.certificationRepository.count(where);
  }

  @get('/certifications', {
    responses: {
      '200': {
        description: 'Array of Certification model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Certification}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Certification)) filter?: Filter,
  ): Promise<Certification[]> {
    return await this.certificationRepository.find(filter);
  }

  @patch('/certifications', {
    responses: {
      '200': {
        description: 'Certification PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() certification: Certification,
    @param.query.object('where', getWhereSchemaFor(Certification)) where?: Where,
  ): Promise<Count> {
    return await this.certificationRepository.updateAll(certification, where);
  }

  @get('/certifications/{id}', {
    responses: {
      '200': {
        description: 'Certification model instance',
        content: {'application/json': {'x-ts-type': Certification}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Certification> {
    return await this.certificationRepository.findById(id);
  }

  @patch('/certifications/{id}', {
    responses: {
      '204': {
        description: 'Certification PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() certification: Certification,
  ): Promise<void> {
    await this.certificationRepository.updateById(id, certification);
  }

  @del('/certifications/{id}', {
    responses: {
      '204': {
        description: 'Certification DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.certificationRepository.deleteById(id);
  }
}
