import { DoctorRead } from "../../../models/doctor/doctor-read.model";
export interface DoctorStateModel {
  doctors: DoctorRead[];
  selectedDoctor: DoctorRead | null;
  loading: boolean;
  error: string | null;
}
