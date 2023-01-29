<script setup lang="ts">
import router from "@/router";
import PartApi from "@/api/PartApi";
import { onMounted, ref } from "vue";
import Part from "@/models/Part";

const currentPart = ref('');
const parts: any = ref([]);

onMounted((): void => {
  loadParts();
});

const loadParts = async (): Promise<void> => {
  parts.value = await PartApi.getParts();
};

const handleSelect = (index: string): void => {
  router.push(index);
};

const onChangePart = (value: string): void => {

}
</script>

<template>
  <el-menu
    default-active="pki"
    class="main-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#72ff92"
    @select="handleSelect"
    :ellipsis="false"
  >
    <el-menu-item index="pki">ПКИ</el-menu-item>
    <el-menu-item index="apkzi">АПКЗИ</el-menu-item>
    <el-menu-item index="system_case">Системные блоки</el-menu-item>
    <el-menu-item index="pc">ПЭВМ</el-menu-item>
    <div class="additional-menu-items">
      <el-select v-model="currentPart" @change="onChangePart">
        <el-option
          v-for="item in parts"
          :key="item._id"
          :label="item.part"
          :value="item._id"
        />
      </el-select>
    </div>
  </el-menu>
</template>

<style scoped>
.main-menu {
  background-image: radial-gradient(transparent 1px, #545c64 1px);
  backdrop-filter: saturate(50%) blur(4px);
}
.additional-menu-items {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  width: 100%;
}
</style>
