import { DoctorCreate } from '../../../models/doctor/doctor-create.model';

export class GetDoctors {
  static readonly type = '[Doctor] Get Doctors';
}

export class GetDoctorById {
  static readonly type = '[Doctor] Get Doctor By Id';
  constructor(public id: number) {}
}

export class AddDoctor {
  static readonly type = '[Doctor] Add Doctor';
  constructor(public payload: DoctorCreate) {}
}

export class UpdateDoctor {
  static readonly type = '[Doctor] Update Doctor';
  constructor(public id: number, public payload: DoctorCreate) {}
}

export class DeleteDoctor {
  static readonly type = '[Doctor] Delete Doctor';
  constructor(public id: number) {}
}
