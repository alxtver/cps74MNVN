<template>
  <el-menu
    v-if="isAuth"
    :default-active="activeIndex"
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
    <el-menu-item index="systemCases">Системные блоки</el-menu-item>
    <el-menu-item index="pc">ПЭВМ</el-menu-item>
    <div class="additional-menu-items">
      <el-select v-model="current" @change="onSelectPart">
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

<script lang="ts" src="./MainMenu.ts"></script>

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
