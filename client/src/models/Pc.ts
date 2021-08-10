import Unit from '@/models/Unit';
import Part from "@/models/Part";

export default class Pc {
	public _id?: string | null = null; // id
	public execution = '';
	public serialNumber = '';
	public fdsi = '';
	public part: Part | string = '';
	public attachment = '';
	public created: number = Date.now();
	public back_color = '#8989a7';
	public systemCaseUnits: Unit[] = [];
	public arm = '';
	public pc_unit: Unit[] = [
		{
			i: 0,
			fdsi: '',
			type: 'Системный блок',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 1,
			fdsi: '',
			type: 'Клавиатура',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 2,
			fdsi: '',
			type: 'Мышь',
			name: '',
			quantity: '1',
			serial_number: 'б/н',
			notes: '',
		},
		{
			i: 3,
			fdsi: '',
			type: 'Монитор',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 4,
			fdsi: '',
			type: 'Монитор',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 5,
			fdsi: '',
			type: 'Источник бесперебойного питания',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 6,
			fdsi: '',
			type: 'Сетевой фильтр',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
		{
			i: 7,
			fdsi: '',
			type: 'Гарнитура',
			name: '',
			quantity: '1',
			serial_number: '',
			notes: '',
		},
	]
}
