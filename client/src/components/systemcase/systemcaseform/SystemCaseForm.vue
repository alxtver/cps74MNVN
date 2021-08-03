<template>
    <div class="system-case-card mb-4 mt-4 ml-4 mr-4" :style="systemCaseShadow">
        <system-case-table
            :systemCase="systemCase"
            @updateSystemCase="updateSystemCase"
        ></system-case-table>
        <group-buttons></group-buttons>
    </div>
</template>

<script src="./SystemCaseForm.ts" lang="ts"></script>

<style lang="scss" scoped>
.system-case-card {
    padding: 0 30px 10px 30px;
}
</style>
