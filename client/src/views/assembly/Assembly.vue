<template>
    <div class="me-auto ml-auto mt-auto mb-auto" v-if="systemCase" @touchstart="touchStartMethod">
            <v-card min-width="1000" :class="cardClass" elevation="10" style="padding: 1px">
                <system-case-form :systemCase="systemCase"></system-case-form>
            </v-card>
        <assembly-buttons
            ref="assemblyButtons"
            @next="next"
            @previous="previous"
        ></assembly-buttons>
        
        <v-card class="serial-card">
            <div>
                {{selectedSerialNumber}}
            </div>
        </v-card>
    </div>
</template>

<script src="./Assembly.ts" lang="ts"></script>

<style scoped lang="scss">
.pcCardAssemblyNext {
    animation-name: slideNext;
    animation-duration: .5s;
}

.pcCardAssemblyPrevious {
    animation-name: slidePrevious;
    animation-duration: .5s;
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
    position: absolute;
    top: 50px;
    left: calc((100% / 2) - 150px);
    width: 300px;
    height: 50px;
    font-size: 35px;
}
</style>
