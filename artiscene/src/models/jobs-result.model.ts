import {Model, model, property} from '@loopback/repository';

@model()
export class JobsResult extends Model {
  @property({
    type: 'any',
  })
  job?: any;

  @property({
    type: 'array',
    itemType: 'any',
  })
  proposals?: any[];

  constructor(data?: Partial<JobsResult>) {
    super(data);
  }
}
