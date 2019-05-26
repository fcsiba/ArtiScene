import {Entity, model, property} from '@loopback/repository';

@model()
export class Contract extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  proposal_id?: number;

  @property({
    type: 'number',
  })
  client_id?: number;

  @property({
    type: 'number',
  })
  artist_id?: number;

  @property({
    type: 'date',
  })
  start_time?: string;

  @property({
    type: 'date',
  })
  end_time?: string;

  @property({
    type: 'number',
  })
  amount?: number;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}
