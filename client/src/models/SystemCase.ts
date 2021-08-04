import Unit from '@/models/Unit';
import Part from "@/models/Part";

export default class SystemCase {
    public _id?: string | null = null; // id
    public execution = '';
    public serialNumber = '';
    public fdsi = '';
    public part: Part | string = '';
    public attachment = '';
    public created: number = Date.now();
    public numberMachine = '';
    public back_color = '#8989a7';
    public systemCaseUnits: Unit[] = [
        {
            i: 0,
            fdsi: '',
            type: 'Корпус',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 1,
            fdsi: '',
            type: 'Процессор',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 2,
            fdsi: '',
            type: 'Вентилятор процессора',
            name: '',
            quantity: '1',
            serial_number: 'б/н',
            notes: '',
        },
        {
            i: 3,
            fdsi: '',
            type: 'Блок питания',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 4,
            fdsi: '',
            type: 'Оперативная память',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 5,
            fdsi: '',
            type: 'Оперативная память',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 6,
            fdsi: '',
            type: 'Системная плата',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 7,
            fdsi: '',
            type: 'Видеокарта',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 8,
            fdsi: '',
            type: 'Накопитель на жестком магнитном диске',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 9,
            fdsi: '',
            type: 'Корзина для НЖМД',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 10,
            fdsi: '',
            type: 'Оптический привод',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
        },
        {
            i: 11,
            fdsi: '',
            type: 'СЗИ10 PCI Express',
            name: '',
            quantity: '1',
            serial_number: '',
            notes: '',
            szi: 'apkzi',
        },
    ];
}
