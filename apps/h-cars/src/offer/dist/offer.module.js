"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OfferModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var offer_schema_1 = require("../models/offer.schema");
var offer_service_1 = require("./offer.service");
var OfferModule = /** @class */ (function () {
    function OfferModule() {
    }
    OfferModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: 'Offer', schema: offer_schema_1.OfferSchema }]),
            ],
            providers: [offer_service_1.OfferService],
            exports: [offer_service_1.OfferService]
        })
    ], OfferModule);
    return OfferModule;
}());
exports.OfferModule = OfferModule;
