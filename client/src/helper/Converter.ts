import Pki from '@/models/Pki';

class Converter {
    /**
     * Преобразование русских букв в английские и наоборот
     * @param text
     */
    public translate(text) {
        let ruToEnLeather = '';
        let enToRuLeather = '';
        const ruLet = 'ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ';
        const engLet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        for (const l of text.toUpperCase()) {
            const ind = ruLet.indexOf(l);
            ruToEnLeather += ind >= 0 ? engLet[ind] : l;
        }
        for (const l of text.toUpperCase()) {
            const ind = engLet.indexOf(l);
            enToRuLeather += ind >= 0 ? ruLet[ind] : l;
        }
        return {
            ruToEnLeather,
            enToRuLeather,
        };
    }

    public snModifier(pki: Pki) {
        let serialNumber = pki.serial_number;
        const vendor = pki.vendor;
        const eanCode = pki.ean_code;
        const typePKI = pki.type_pki;
        //Проверка на русские символы в серийнике
        for (const letter of serialNumber) {
            const codeOfLetter = letter.charCodeAt(0);
            if (codeOfLetter > 122) {
                let ruToEnSN = '';
                const ruLet = 'ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ';
                const engLet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
                for (const l of serialNumber.toUpperCase()) {
                    const idx = ruLet.indexOf(l);
                    if (idx >= 0) {
                        ruToEnSN += engLet[idx];
                    } else {
                        ruToEnSN += l;
                    }
                }
                serialNumber = ruToEnSN;
                break;
            }
        }
        // приводы i-Has
        if (eanCode === '4718390028172') {
            const modifiedSN = serialNumber.split(' ').reverse().join(' ');
            return {
                SN: modifiedSN,
                flash: false,
            };
        }
        // серийники Gigabite
        if (vendor === 'Gigabyte' || vendor == 'GIGABYTE') {
            const regex = /SN\w*/g;
            if (serialNumber.match(regex)) {
                const modifiedSN = serialNumber.match(regex)[0];
                return {
                    SN: modifiedSN,
                    flash: false,
                };
            }
        }
        // серийники APC  удаление буквы S
        if (
            (vendor === 'APC' || vendor === 'APC Back-UPS') &&
            serialNumber[0] === 'S'
        ) {
            const modifiedSN = serialNumber.substring(1);
            return {
                SN: modifiedSN,
                flash: false,
            };
        }
        // серийники Canon
        if (eanCode === '4549292119855') {
            if (
                serialNumber.substring(0, 3) === ']C1' &&
                serialNumber.substring(serialNumber.length - 1)
            ) {
                const modifiedSN = serialNumber.substring(3, 12);
                return {
                    SN: modifiedSN,
                    flash: false,
                };
            }
        }
        // мониторы DELL пока закоментил, т.к. вроде что-то поменяловь
        // let flashErr;
        // if ((vendor === 'Dell' || vendor === 'DELL') && typePKI === 'Монитор') {
        //     let modifiedSN = '';
        //     flashErr =
        //         'Не забудь потом внести ревизию в серийные номера этих мониторов!!!';
        //     for (let i = 0; i < serialNumber.length; i++) {
        //         modifiedSN += serialNumber[i];
        //         if (i == 1 || i == 7 || i == 12 || i == 15) {
        //             modifiedSN += '-';
        //         }
        //     }
        //     return {
        //         SN: modifiedSN,
        //         message: flashErr,
        //     };
        // }
        return {
            SN: serialNumber,
            message: false,
        };
    }
}
const converter = new Converter();
export default converter;
