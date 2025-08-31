export class LoadFeeSchedules {
  static readonly type = '[FeeSchedule] Load All';
}

export class LoadFeeScheduleById {
  static readonly type = '[FeeSchedule] Load By Id';
  constructor(public id: number) {}
}

export class CreateFeeSchedule {
  static readonly type = '[FeeSchedule] Create';
  constructor(public payload: { visitTypeID: number; fee: number }) {}
}

export class UpdateFeeSchedule {
  static readonly type = '[FeeSchedule] Update';
  constructor(public id: number, public payload: { visitTypeID: number; fee: number }) {}
}

export class DeleteFeeSchedule {
  static readonly type = '[FeeSchedule] Delete';
  constructor(public id: number) {}
}
