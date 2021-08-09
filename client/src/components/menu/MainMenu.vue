<template>
    <div>
        <v-app-bar
            color="#8e8c8c43"
            dense
            fixed
            width="100%"
            elevate-on-scroll
            style="z-index: 999; backdrop-filter: blur(2px)"
            v-if="auth"
        >
            <v-app-bar-nav-icon
                v-if="isMobile"
                @click="drawer = true"
            ></v-app-bar-nav-icon>
            <div v-if="!isMobile" style="display: flex; width: 1920px">
                <v-btn
                    v-for="item in nav"
                    :key="item.title"
                    :to="item.to"
                    :title="item.title"
                    elevation="0"
                    large
                    style="background: rgba(153, 153, 153, 0); width: 170px"
                >{{ item.title }}
                </v-btn
                >
                
                <v-spacer></v-spacer>
                <el-select
                    v-if="isPcOrSystemCase"
                    class="part-select mt-1"
                    v-model="currentSn"
                    placeholder="Серийные номера"
                    filterable
                    allow-create
                    @change="changeSerialNumber"
                >
                    <el-option
                        v-for="serialNumber in serialNumbers"
                        :key="serialNumber"
                        :label="serialNumber"
                        :value="serialNumber"
                    >
                    </el-option>
                </el-select>
                
                <el-select
                    class="part-select mt-1 ml-1"
                    v-model="currentPart"
                    placeholder="Темы"
                    filterable
                    allow-create
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
                    <v-list shaped>
                        <v-list-item-group
                            multiple
                            @change="changeItem"
                            v-model="selectedItem"
                        >
                            <template>
                                <v-list-item :key="0" value="sound">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-icon>
                                            <v-icon
                                                v-text="soundState"
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
                style="backdrop-filter: blur(3px); background: #8e8c8c43"
            >
                <v-list nav dense>
                    <v-list-item-group active-class="text--accent-4">
                        <v-list-item v-for="item in nav" :key="item.to" :to="item.to">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
    min-width: 150px;
}
</style>
