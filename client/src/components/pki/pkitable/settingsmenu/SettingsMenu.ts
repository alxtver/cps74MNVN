import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class SettingsMenuTS extends Vue {
    private isEditing = false;

    private changeItem(values): void {
        this.isEditing = values.includes('isEditing');
        this.$emit('isEditing', this.isEditing);
    }
}
