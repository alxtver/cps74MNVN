import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    Query,
    NotFoundException,
    Delete,
    Param,
    Req
} from '@nestjs/common';
import { PkiService } from './pki.service';
import {CreateCustomerDTO} from "../customer/dto/create-customer.dto";
import {PkiDto} from "../dto/pki.dto";

@Controller('pkis')
export class PkiController {
    constructor(private pkiService: PkiService) { }

    /**
     * Получить ПКИ
     * @param req
     * @param res
     */
    @Get('')
    async getAllPki(@Req() req, @Res() res) {
        const pkis = await this.pkiService.getAllPki(req);
        return res.status(HttpStatus.OK).json(pkis);
    }

    /**
     * Добавить ПКИ
     * @param res
     * @param req
     * @param PkiDto
     */
    @Post('/add')
    async addPki(@Res() res, @Req() req, @Body() PkiDto: PkiDto) {
        const response = await this.pkiService.addPki(PkiDto, req);
        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Редактировать ПКИ
     * @param req
     * @param res
     */
    @Put('')
    async editPki(@Req() req, @Res() res) {
        const response = await this.pkiService.editPki(req);
        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Удалить ПКИ
     * @param req
     * @param res
     */
    @Delete('')
    async deletePki(@Req() req, @Res() res) {
        const response = await this.pkiService.deletePki(req);
        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Автокомплит типов ПКИ
     * @param res
     * @param req
     */
    @Get('/autocompleteTypesPki')
    async autocompleteTypesPki(@Res() res, @Req() req) {
        const response = await this.pkiService.autocompleteTypesPki(req);
        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Автокомплит производителей
     * @param res
     * @param req
     */
    @Get('/autocompleteVendors')
    async autocompleteVendors(@Res() res, @Req() req) {
        const response = await this.pkiService.autocompleteVendors(req);
        return res.status(HttpStatus.OK).json(response);
    }

    /**
     * Автокомплит стран
     * @param res
     * @param req
     */
    @Get('/autocompleteCountries')
    async autocompleteCountries(@Res() res, @Req() req) {
        const response = await this.pkiService.autocompleteCountries(req);
        return res.status(HttpStatus.OK).json(response);
    }
}
