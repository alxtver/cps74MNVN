import type Pki from '@/models/Pki'
import PkiApi from '@/api/PkiApi'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default function PkiTableSetup() {
    const store = useStore()
    const components = ref([] as Pki[])
    const part = store.getters.getPart

    onMounted(async () => {
        components.value = await loadComponents(part)
    })

    const sortMethod = (a: Pki, b: Pki): number => {
        if (a.type_pki > b.type_pki) {
            return 1
        }
        return a.type_pki < b.type_pki ? -1 : 0
    }

    /**
     * Загрузить ПКИ
     * @param part
     */
    const loadComponents = async (part: string): Promise<Pki[]> => {
        const data = await PkiApi.getPki(part)
        return data.sort(sortMethod)
    }

    watch(
        () => store.getters.getPart,
        async (newValue) => {
            components.value = await loadComponents(newValue)
        }
    )

    /**
     * Удалить компонент
     * @param row
     */
    const removeComponent = async (row: Pki): Promise<void> => {
        await PkiApi.deletePki(row._id as string, part)
        const index = components.value.indexOf(row)
        if (index !== -1) {
            components.value = components.value.splice(index, 1)
        }
    }

    const updateComponent = async (row: Pki): Promise<void> => {
        const index = components.value.indexOf(row)
        const pki = await PkiApi.editPki(row, part)
        if (index !== -1) {
            components.value.splice(index, 1, pki)
        }
    }

    return { components, removeComponent, updateComponent }
}
