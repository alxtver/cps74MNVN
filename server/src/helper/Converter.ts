class Converter {
    /**
     * Преобразование русских букв в английские и наоборот
     * @param text
     */
    public translate(text: string) {
        let ruToEnLeather = "";
        let enToRuLeather = "";
        const ruLet = "ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ";
        const engLet = "QWERTYUIOPASDFGHJKLZXCVBNM";
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
}
const converter = new Converter();
export default converter;
