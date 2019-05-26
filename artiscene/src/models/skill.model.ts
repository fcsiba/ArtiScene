import {Entity, model, property} from '@loopback/repository';

@model()
export class Skill extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  constructor(data?: Partial<Skill>) {
    super(data);
  }
}
