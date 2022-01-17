export class Action {
  constructor(
    public id?: string,
    public actionType?: ActionType,
    public clientInstanceId?: string,
    public actionTarget?: string
  ) {
  }
}

export enum ActionType {
  Email = 'Email',
  Webhook = 'Webhook'
}
