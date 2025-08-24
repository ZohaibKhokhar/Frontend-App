export interface PatientVisitRead {
  visitID: number;
  patientID: number;
  doctorID: number;
  visitTypeID: number;
  visitDate: Date;
  description: string;
}
