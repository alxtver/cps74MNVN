import { Component, Vue } from 'vue-property-decorator';
import AddSystemCaseCard from '@/components/systemcase/addsystemcasecard/AddSystemCaseCard.vue';

@Component({ components: { AddSystemCaseCard } })
export default class AddSystemCase extends Vue {
	private dialog = false;
}
