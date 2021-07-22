<template>
    <v-menu
        left
        bottom
        :offset-y="true"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
    
        <v-list shaped>
            <v-list-item-group
                multiple
                @change="changeItem"
            >
                <template>
                    <v-list-item
                        value="isEditing"
                    >
                        <template v-slot:default="{ active }">
                            <v-list-item-content>
                                <v-list-item-title v-text="'Редактирование'"></v-list-item-title>
                            </v-list-item-content>
                        
                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="active"
                                ></v-checkbox>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script src="./SettingsMenu.ts"></script>

<style scoped>

</style>
