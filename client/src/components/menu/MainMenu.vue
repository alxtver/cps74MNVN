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
            <div
                class="menu-buttons"
                v-if="!isMobile"
                style="display: flex; width: 1920px"
            >
                <v-btn
                    v-for="item in nav"
                    :key="item.title"
                    :to="item.to"
                    :title="item.title"
                    elevation="0"
                    large
                    style="background: rgba(153, 153, 153, 0); width: 170px"
                    >{{ item.title }}
                </v-btn>

                <v-spacer></v-spacer>
                <v-select
                    v-if="isPcOrSystemCase"
                    class="part-select ml-2 mt-3"
                    dense
                    v-model="currentSn"
                    label="Серийные номера"
                    :menu-props="{ offsetY: true }"
                    :items="serialNumbers"
                    @change="changeSerialNumber"
                >
                </v-select>

                <v-combobox
                    class="part-select mt-3 ml-1"
                    dense
                    v-model="currentPart"
                    label="Тема"
                    :menu-props="{ offsetY: true }"
                    :items="parts"
                    item-text="part"
                    item-value="part"
                    @change="changeCurrentPartValue"
                >
                </v-combobox>
                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            class="ml-3"
                            v-bind="attrs"
                            v-on="on"
                            v-text="iconCog"
                        >
                        </v-icon>
                    </template>
                    <v-list>

                            <v-list-item>
                                <template>
                                    <v-select
                                        v-model="selectedCompany"
                                        class="type-select mt-2"
                                        label="Компания"
                                        :items="companies"
                                        item-text="companyName"
                                        item-value="value"
                                        :menu-props="{ offsetY: true }"
                                        @change="onChangeCompany"
                                    ></v-select>
                                </template>
                            </v-list-item>
                            <v-list-item>
                                <template>
                                    <v-list-item-icon>
                                        <v-icon v-text="soundState"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-text="'Звук'"
                                        ></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-switch
                                            v-model="isSoundOn"
                                            @change="onChangeSound"
                                        ></v-switch>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item link to="/eans">
                        <v-list-item-icon>
                          <v-icon >mdi-barcode-scan</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Штрих-коды</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link to="/countries">
                        <v-list-item-icon>
                          <v-icon >mdi-flag-variant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title >Страны</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
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
                        <v-list-item
                            v-for="item in nav"
                            :key="item.to"
                            :to="item.to"
                        >
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
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
    max-width: 300px;
}
.menu-buttons {
    .v-btn {
        border-radius: 0;
        height: 48px !important;
        border-bottom: solid #99999900;
    }
    .v-btn:hover {
        border-bottom: solid #d2d2d2;
    }
    .v-btn--active {
        border-bottom: solid #0cc5e7;
        border-radius: 0;
    }
    .v-btn--active:hover {
        border-bottom: solid #0cc5e7;
    }
}
</style>
