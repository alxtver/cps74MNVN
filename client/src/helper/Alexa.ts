class Alexa {
    /**
     * Звук при ошибке
     */
    public alert() {
        const context = new AudioContext();
        const osc = context.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 180;
        osc.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + 0.2);
    }

    public wave() {
        const audio = {};
        audio['alert'] = new Audio();
        audio['alert'].src = require('../assets/sound/wave.mp3');
        audio['alert'].play();
    }

    /**
     * Текст в речь
     * @param text текст для преобразования
     * @param rate скорость воспроизведения
     * @param sound включен ли звук
     */
    public say(text: string, rate: number, sound: boolean): void {
        if (!sound) {
            return;
        }
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = 'ru-RU';
        ut.volume = 1;
        ut.rate = rate;
        ut.pitch = 1;
        speechSynthesis.speak(ut);
    }
}
const alexa = new Alexa();
export default alexa;
