<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pki } from '../interfaces/pki.interface';
import { User } from '../interfaces/user.interface';
import converter from '../helper/Converter';
import { PkiDto } from '../dto/pki.dto';
import {Ean} from "../interfaces/ean.interface";
import {EanDto} from "../dto/ean.dto";

@Injectable()
export class PkiService {
    constructor(
        @InjectModel('Pki')
        private readonly pkiModel: Model<Pki>,
        @InjectModel('User')
        private readonly userModel: Model<User>,
        @InjectModel('Ean')
        private readonly eanModel: Model<Ean>,
    ) {}

    async getAllPki(req): Promise<Pki[]> {
        return await this.pkiModel.find({ part: req.session.part }).exec();
    }

    async addPki(PkiDto: PkiDto, req): Promise<Pki | string> {
        // если оставить id равным null то после сохранения прилетает
        // объект без id, хотя в базе сохраняется с id...
        if (PkiDto._id === null) {
            delete PkiDto._id;
        }
        // проверяем есть ли такой серийник в данной теме
        const findSN: Pki[] = await this.pkiModel.find({
            part: req.session.part,
            serial_number: PkiDto.serial_number,
        });
        if (findSN.length > 0) {
            return 'notUniqueSerialNumber';
        }
        // Проверяем штрих-код, если есть, пропускаем, если нет заносим новый
        if (PkiDto.ean_code) {
            const ean = await this.eanModel.findOne({ean_code: PkiDto.ean_code})
            if (!ean) {
                const newEan = Object.assign(await new this.eanModel(), PkiDto)
                newEan.save()
            }
        }
        return await this.pkiModel(PkiDto).save();
    }

    async editPki(req): Promise<Pki> {
        await this.pkiModel.findOneAndUpdate(
            { _id: req.body.pki._id },
            req.body.pki,
        );
        return req.body.pki;
    }

    async deletePki(req): Promise<Pki> {
        return await this.pkiModel.findOneAndDelete({ _id: req.body.id });
    }

    async autocompleteTypesPki(req): Promise<string[]> {
        const types = await this.pkiModel.find().distinct('type_pki');
        return this.autocompleteQuery(types, req.query.query);
    }

    async autocompleteVendors(req): Promise<string[]> {
        const vendors = await this.pkiModel.find().distinct('vendor');
        return this.autocompleteQuery(vendors, req.query.query);
    }

    async autocompleteCountries(req): Promise<string[]> {
        const countries = await this.pkiModel.find().distinct('country');
        return this.autocompleteQuery(countries, req.query.query);
    }

    autocompleteQuery(arr: string[], query: string): string[] {
        const ruToEnQueryText = converter.translate(query).ruToEnLeather;
        const enToRuQueryText = converter.translate(query).enToRuLeather;
        if (query === '') {
            return [];
        }
        return arr.filter((item) => {
            return (
                item
                    .toLocaleLowerCase()
                    .includes(ruToEnQueryText.toLocaleLowerCase()) ||
                item
                    .toLocaleLowerCase()
                    .includes(enToRuQueryText.toLocaleLowerCase())
            );
        });
=======
import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Pki} from './interfaces/pki.interface';

@Injectable()
export class PkiService {
    constructor(@InjectModel('Pki') private readonly pkiModel: Model<Pki>) { }

    // fetch all pkis
    async getAllPki(): Promise<Pki[]> {
        return await this.pkiModel.find().exec();
>>>>>>> 5e42e39... first commit
    }
}
