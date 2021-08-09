import {Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class Pagination extends Vue {
    @Prop()
    private pages!: number;

    @Prop()
    private page!: number;

    /**
     * Вешаем слушатели
     * @private
     */
    private beforeMount() {
        window.addEventListener('keydown', this.handleKeydown, null);
    }

    /**
     * Убираем слушатели
     * @private
     */
    private beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    /**
     * Обработчик клавиш
     * @param e
     * @private
     */
    private handleKeydown(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextPage();
        } else if (e.ctrlKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previousPage();
        }
    }

    /**
     * Выбор страницы
     * @private
     * @param pageIndex
     */
    private changePage(pageIndex): void {
        this.$emit('changePage', pageIndex);
    }

    /**
     * Следующая страница
     * @private
     */
    private nextPage(): void {
        if (this.page + 1 <= this.pages) {
            this.$emit('nextPage');
        }
    }

    /**
     * Предыдущая страница
     * @private
     */
    private previousPage(): void {
        if (this.page - 1 >= 1) {
            this.$emit('previousPage');
        }
    }
}
