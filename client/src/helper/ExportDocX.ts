import Docxtemplater from "docxtemplater";
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import Pc from "@/models/Pc";

class ExportDocX {

	/**
	 * Получаем шаблон
	 * @param url
	 * @param callback
	 * @private
	 */
	private loadFile(url, callback): void {
		PizZipUtils.getBinaryContent(url, callback);
	}

	/**
	 * Создаем документ
	 * @param pc
	 * @param company
	 * @param template
	 * @param fileName
	 * @private
	 */
	private createDocument(pc: Pc, company: string, template: string, fileName: string): void {
		this.loadFile(`templates/${company}/${template}`, (error, content) => {
			if (error) {
				throw error;
			}
			const zip = new PizZip(content);
			const doc = new Docxtemplater(zip, {
				paragraphLoop: true,
				linebreaks: true,
			});
			doc.setData({
				fdsi: pc.fdsi,
				serial_number: pc.serial_number,
				pc_unit: pc.pc_unit,
				system_case_unit: pc.system_case_unit,
			});
			try {
				// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
				doc.render();
			} catch (error) {
				// The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
				const replaceErrors = (key, value) => {
					if (value instanceof Error) {
						return Object.getOwnPropertyNames(value).reduce(
							function (error, key) {
								error[key] = value[key];
								return error;
							},
							{},
						);
					}
					return value;
				};
				console.log(JSON.stringify({ error: error }, replaceErrors));

				if (
					error.properties &&
					error.properties.errors instanceof Array
				) {
					const errorMessages = error.properties.errors
						.map(function (error) {
							return error.properties.explanation;
						})
						.join('\n');
					console.log('errorMessages', errorMessages);
					// errorMessages is a humanly readable message looking like this :
					// 'The tag beginning with "foobar" is unopened'
				}
				throw error;
			}
			const out = doc.getZip().generate({
				type: 'blob',
				mimeType:
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			});
			// Output the document using Data-URI
			saveAs(out, fileName);
		});
	}

	/**
	 * Получить паспорт ПЭВМ
	 * @param pc
	 * @param company
	 */
	public passport(pc: Pc, company: string): void {
		const fileName = `${pc.serial_number}.docx`
		this.createDocument(pc, company, 'passport.docx', fileName)
	}

	/**
	 * Получить паспорт системного блока зип
	 * @param pc
	 * @param company
	 */
	public systemCaseZip(pc: Pc, company: string): void {
		const fileName = `${pc.serial_number}-E.docx`
		this.createDocument(pc, company, 'systemCaseZip.docx', fileName)
	}

	/**
	 * Получить зип этикетку
	 * @param pc
	 * @param company
	 */
	public zipLabel(pc: Pc, company: string): void {
		const fileName = `${pc.serial_number}.docx`
		this.createDocument(pc, company, 'zipLabel.docx', fileName)
	}
}
const exportDocX = new ExportDocX();
export default exportDocX;
