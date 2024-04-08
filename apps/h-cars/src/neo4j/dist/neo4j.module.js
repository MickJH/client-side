"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Neo4jModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var neo4j_service_1 = require("./neo4j.service");
var Neo4jModule = /** @class */ (function () {
    function Neo4jModule() {
    }
    Neo4jModule = __decorate([
        common_1.Module({
            imports: [config_1.ConfigModule],
            providers: [neo4j_service_1.Neo4jService],
            exports: [neo4j_service_1.Neo4jService]
        })
    ], Neo4jModule);
    return Neo4jModule;
}());
exports.Neo4jModule = Neo4jModule;
