<template>
  <div
    class="fixed bottom-10 left-10 flex flex-col rounded-md bg-primary-content p-3 shadow-md"
    v-if="mapStore.getDistance"
  >
    <div class="m-1 flex flex-row items-center">
      <Icon icon="ic:round-access-time-filled" />
      <span class="ml-2 text-sm">{{ durationHoursAndMinutes }}</span>
    </div>
    <div class="m-1 flex flex-row items-center">
      <Icon icon="mdi:map-marker-distance" />
      <span class="ml-2 text-sm">{{ distance }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMapStore } from '@/stores/map'
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  const mapStore = useMapStore()

  function padToTwoDigits(num: number) {
    return num.toString().padStart(2, '0')
  }

  const durationHoursAndMinutes = computed(() => {
    if (!mapStore.getDuration) return undefined
    const hours = Math.floor(mapStore.getDuration / 60)
    const minutes = mapStore.getDuration % 60
    return `${padToTwoDigits(hours)}h : ${padToTwoDigits(minutes)} min.`
  })

  const distance = computed(() => {
    if (!mapStore.getDistance) return undefined
    return `${mapStore.getDistance} km.`
  })
</script>

<style scoped></style>
