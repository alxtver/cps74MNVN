<template>
    <div
        class="me-auto ml-auto mt-auto mb-auto"
        v-if="systemCase"
        @touchstart="touchStartMethod"
    >
        <system-case-form
            ref="systemCaseForm"
            style="max-height: calc(100vh - 455px); overflow: auto; min-width: 1000px;"
            :class="cardClass"
            :systemCase="systemCase"
        ></system-case-form>
        <assembly-buttons
            ref="assemblyButtons"
            :serialNumberPanelStyle="serialNumberPanelStyle"
            @next="next"
            @previous="previous"
        ></assembly-buttons>

        <v-card class="serial-card" :class="serialNumberPanelStyle">
                {{ selectedSerialNumber }}
        </v-card>
    </div>
</template>

<script src="./Assembly.ts" lang="ts"></script>

<style scoped lang="scss">
.pcCardAssemblyNext {
    animation-name: slideNext;
    animation-duration: 0.5s;
}

.pcCardAssemblyPrevious {
    animation-name: slidePrevious;
    animation-duration: 0.5s;
}
@keyframes slideNext {
    50% {
        transform: translate(-100vw, 0);
    }

    51% {
        transform: translate(100vw, 0);
    }
}

@keyframes slidePrevious {
    50% {
        transform: translate(100vw, 0);
    }

    51% {
        transform: translate(-100vw, 0);
    }
}
.serial-card {
    position: fixed;
    top: 50px;
    left: calc((100% / 2) - 150px);
    width: 300px;
    height: 50px;
    font-size: 35px;
    color: #4c4a4a;
}
.ok {
  background: #4db94d;
}
.not-ok {
  background: orangered;
}
</style>
