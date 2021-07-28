import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({ components: {} })
export default class Pagination extends Vue {
    @Prop()
    private pages!: number;

    private page = 1;

    private beforeMount () {
        window.addEventListener('keydown', this.handleKeydown, null);
    }

    private beforeDestroy () {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    private handleKeydown (e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'ArrowRight') {
            e.preventDefault()
            this.nextPage()
        } else if (e.ctrlKey && e.key === 'ArrowLeft') {
            e.preventDefault()
            this.previousPage()
        }
    }

    private changePage(page): void {
        this.$emit('changePage', page)
    }

    private nextPage(): void {
        this.$emit('nextPage')
    }

    private previousPage(): void {
        this.$emit('previousPage')
    }
}
