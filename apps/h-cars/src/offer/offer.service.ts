import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfferDTO } from './offer.dto';
import { Offer } from './offer';

@Injectable()
export class OfferService {
  constructor(@InjectModel('Offer') private offerModel: Model<Offer>) {}

  async createOffer(offerDTO: OfferDTO): Promise<Offer> {
    const createdOffer = new this.offerModel(offerDTO);
    return createdOffer.save();
  }

  async updateOffer(id: string, offerDTO: OfferDTO): Promise<Offer> {
    return this.offerModel.findByIdAndUpdate(id, offerDTO, { new: true });
  }

  async deleteOffer(id: string): Promise<Offer> {
    return this.offerModel.findByIdAndDelete(id);
  }

  async getOffersForCar(carId: string): Promise<Offer[]> {
    return this.offerModel.find({ car: carId });
  }

  async getOffersForUser(userId: string): Promise<Offer[]> {
    return this.offerModel.find({ userId });
  }
}
