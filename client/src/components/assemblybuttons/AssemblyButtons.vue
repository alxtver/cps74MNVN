<template>
    <div class="mt-3" style="display: flex; justify-content: space-between">
            <v-btn
                :disabled="isDisablePrevious"
                class="change-button"
                x-large
                elevation="10"
                color="blue-grey"
                @click="previous"
            >
                <v-icon class="icon">mdi-chevron-left</v-icon>
            </v-btn>

            <v-btn
                :disabled="isDisableNext"
                class="change-button"
                x-large
                elevation="10"
                color="blue-grey"
                @click="next"
            >
                <v-icon class="icon">mdi-chevron-right</v-icon>
            </v-btn>
    </div>
</template>

<script src="./AssemblyButtons.ts" lang="ts"></script>

<style scoped lang="scss">
.change-button {
    height: 120px !important;
    width: 150px;
    margin: 3rem;
    .icon {
        color: #999999;
        font-size: 100px;
    }
}
</style>
