import {Entity, model, property} from '@loopback/repository';

@model()
export class Certification extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  artist_id?: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'date',
  })
  date?: string;

  constructor(data?: Partial<Certification>) {
    super(data);
  }
}
