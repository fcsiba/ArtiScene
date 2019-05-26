import { Entity, model, property } from '@loopback/repository';

@model()
export class Hasskill extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'number',
  })
  artist_id?: number;

  @property({
    type: 'number',
  })
  skill_id?: number;

  constructor(data?: Partial<Hasskill>) {
    super(data);
  }
}
