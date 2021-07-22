<template>
    <div>
        <v-app-bar
            color="brown lighten-5"
            dense
            width="100%"
            style="z-index: 999"
            v-if="auth"
        >
            <v-app-bar-nav-icon
                v-if="isMobile"
                @click="drawer = true"
            ></v-app-bar-nav-icon>
            <div v-if="!isMobile" style="display: flex; width: 1920px">
                <v-tabs
                    fixed-tabs
                    background-color="brown lighten-5"
                    :optional="true"
                    @change="changeTab"
                >
                    <v-tabs-slider color="deep-orange"></v-tabs-slider>
                    <v-tab to="/pkis"> ПКИ </v-tab>
                    <v-tab to="/apkzi"> АПКЗИ </v-tab>
                    <v-tab> СБ </v-tab>
                    <v-tab to="/pc"> ПЭВМ </v-tab>
                </v-tabs>
                <v-spacer></v-spacer>
                <el-select
                    class="part-select mt-1"
                    v-model="currentPart"
                    placeholder="Темы"
                    @change="changeCurrentPartValue"
                >
                    <el-option
                        v-for="part in parts"
                        :key="part._id"
                        :label="part.part"
                        :value="part.part"
                    >
                    </el-option>
                </el-select>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            class="ml-3"
                            v-bind="attrs"
                            v-on="on"
                            v-text="iconCog"
                        >
                        </v-icon>
                    </template>
                    <v-list  shaped>
                        <v-list-item-group multiple @change="changeItem" v-model="selectedItem">
                            <template>
                                <v-list-item :key="0" value="sound">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-icon>
                                            <v-icon
                                                v-text="soundState"
                                                @click="test(active)"
                                            ></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="'Звук'"
                                            ></v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-checkbox
                                                :input-value="!active"
                                            ></v-checkbox>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </div>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                :height="innerHeight"
            >
                <v-list nav dense>
                    <v-list-item-group
                        active-class="deep-purple--text text--accent-4"
                    >
                        <v-list-item to="/pkis">
                            <v-list-item-title>ПКИ</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/pc">
                            <v-list-item-title>ПЭВМ</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-app-bar>
    </div>
</template>

<script src="./MainMenu.ts" lang="ts"></script>

<style lang="scss" scoped>
.part-select {
    width: 250px;
}
</style>
