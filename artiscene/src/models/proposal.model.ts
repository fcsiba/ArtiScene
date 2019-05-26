import { Entity, model, property } from '@loopback/repository';

@model()
export class Proposal extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  job_id?: number;

  @property({
    type: 'number',
  })
  artist_id?: number;

  @property({
    type: 'string',
  })
  created_date?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  constructor(data?: Partial<Proposal>) {
    super(data);
  }
}
