export interface PatientVisitCreate {
  patientID: number;
  doctorID: number;
  visitTypeID: number;
  visitDate: Date;
  description: string;
}
