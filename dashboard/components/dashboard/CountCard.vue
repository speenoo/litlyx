<script lang="ts" setup>

const props = defineProps<{
    icon: string,
    value: string,
    text: string,
    avg?: string,
    color: string,
    data?: number[],
    labels?: string[],
    ready?: boolean,
    slow?: boolean,
    todayIndex: number,
    tooltipText: string
}>();

const { snapshotDuration } = useSnapshot()

const { showDrawer } = useDrawer();

</script>

<template>

    <LyxUiCard class="flex !p-0 flex-col overflow-hidden relative max-h-[12rem] aspect-[2/1] w-full">
        <div v-if="ready" class="flex p-4 items-start">
            <div class="flex items-center mt-2 mr-4">
                <i :style="`color: ${props.color}`" :class="icon" class="text-[1.3rem] 2xl:text-[1.5rem]"></i>
            </div>
            <div class="flex flex-col grow">
                <div class="flex items-center gap-2">
                    <div class="brockmann text-lyx-lightmode-text-dark dark:text-text-dirty text-[1.2rem] 2xl:text-[1.4rem]">
                        {{ value }}
                    </div>
                    <div class="poppins text-lyx-lightmode-darker dark:text-text-sub text-[.65rem] 2xl:text-[.8rem]"> {{ avg }} </div>
                </div>
                <div class="poppins text-lyx-lightmode-darker dark:text-text-sub text-[.9rem] 2xl:text-[1rem]"> {{ text }} </div>
            </div>

            <div class="flex flex-col items-center gap-1">
                <UTooltip :text="props.tooltipText">
                    <i class="far fa-info-circle text-lyx-text-darker text-[1rem]"></i>
                </UTooltip>
            </div>

        </div>
        <div class="absolute bottom-0 left-0 w-full h-[50%] flex items-end"
            v-if="((props.data?.length || 0) > 0) && ready">
            <DashboardEmbedChartCard v-if="ready" :todayIndex="todayIndex" :data="props.data || []"
                :labels="props.labels || []" :color="props.color">
            </DashboardEmbedChartCard>
        </div>
        <div v-if="!ready" class="flex justify-center items-center w-full h-full flex-col gap-2">
            <i class="fas fa-spinner text-[2rem] text-accent animate-[spin_1s_linear_infinite] duration-500"></i>
            <div v-if="props.slow"> Can be very slow on large timeframes </div>
        </div>
    </LyxUiCard>


</template>