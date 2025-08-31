// visit-type.actions.ts
export class LoadVisitTypes {
  static readonly type = '[VisitType] Load Visit Types';
}

export class AddVisitType {
  static readonly type = '[VisitType] Add Visit Type';
  constructor(public payload: { typeName: string }) {}
}

export class UpdateVisitType {
  static readonly type = '[VisitType] Update Visit Type';
  constructor(public id: number, public payload: { typeName: string }) {}
}

export class DeleteVisitType {
  static readonly type = '[VisitType] Delete Visit Type';
  constructor(public id: number) {}
}
