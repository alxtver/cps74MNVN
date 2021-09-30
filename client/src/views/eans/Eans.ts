import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EansTable from '@/components/eans/eanstable/EansTable.vue';

@Component({ components: { EansTable } })
export default class Eans extends Vue {}
