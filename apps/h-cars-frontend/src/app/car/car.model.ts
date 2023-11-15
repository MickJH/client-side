export interface Car {
    _id?: string;
    carModel: string;
    counter: number;
    typeOfFuel: 'Petrol' | 'Diesel' | 'Electric';
    transmissionType: 'Automatic' | 'Manual';
    apk: boolean;
    apkExpires?: Date;
    numberPlate: string;
    constructionYear: number;
    imageUrl: string;
  }
  