import {Entity, model, property} from '@loopback/repository';

@model()
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  user_id?: number;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
  })
  created_date?: string;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}
