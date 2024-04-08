import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferSchema } from '../models/offer.schema';
import { OfferService } from './offer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Offer', schema: OfferSchema }]),
  ],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
