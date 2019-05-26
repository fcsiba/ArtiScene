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
import {Skill} from '../models';
import {SkillRepository} from '../repositories';

export class SkillController {
  constructor(
    @repository(SkillRepository)
    public skillRepository : SkillRepository,
  ) {}

  @post('/skills', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {'x-ts-type': Skill}},
      },
    },
  })
  async create(@requestBody() skill: Skill): Promise<Skill> {
    return await this.skillRepository.create(skill);
  }

  @get('/skills/count', {
    responses: {
      '200': {
        description: 'Skill model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where,
  ): Promise<Count> {
    return await this.skillRepository.count(where);
  }

  @get('/skills', {
    responses: {
      '200': {
        description: 'Array of Skill model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Skill}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Skill)) filter?: Filter,
  ): Promise<Skill[]> {
    return await this.skillRepository.find(filter);
  }

  @patch('/skills', {
    responses: {
      '200': {
        description: 'Skill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() skill: Skill,
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where,
  ): Promise<Count> {
    return await this.skillRepository.updateAll(skill, where);
  }

  @get('/skills/{id}', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {'x-ts-type': Skill}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Skill> {
    return await this.skillRepository.findById(id);
  }

  @patch('/skills/{id}', {
    responses: {
      '204': {
        description: 'Skill PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() skill: Skill,
  ): Promise<void> {
    await this.skillRepository.updateById(id, skill);
  }

  @del('/skills/{id}', {
    responses: {
      '204': {
        description: 'Skill DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.skillRepository.deleteById(id);
  }
}
