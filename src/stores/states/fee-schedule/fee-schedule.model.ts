export interface FeeSchedule {
  feeID: number;
  visitTypeID: number;
  fee: number;
}

export interface FeeScheduleStateModel {
  feeSchedules: FeeSchedule[];
  selectedFeeSchedule: FeeSchedule | null;
  loading: boolean;
}
