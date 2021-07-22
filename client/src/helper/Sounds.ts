
class Sounds {
    /**
     * Звук при ошибке
     */
    public alert() {
        const audio = {};
        audio['alert'] = new Audio();
        audio['alert'].src = require('../assets/sound/alert.mp3');
        audio['alert'].play();
    }

    /**
     * Текст в речь
     * @param text текст для преобразования
     * @param rate скорость воспроизведения
     */
    public say(text: string, rate: number): void {
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = 'ru-RU';
        ut.volume = 1;
        ut.rate = rate;
        ut.pitch = 1;
        speechSynthesis.speak(ut);
    }
}
const sounds = new Sounds();
export default sounds;
