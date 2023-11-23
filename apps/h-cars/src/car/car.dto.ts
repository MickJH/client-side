import { FuelType, TransmissionType } from './car';

export interface CarDTO {
  carModel: string;
  counter: number;
  typeOfFuel: FuelType;
  transmissionType: TransmissionType;
  apk: boolean;
  apkExpires: Date;
  numberPlate: string;
  constructionYear: number;
  userEmail: string;
  imageUrl: string;
}
