<template>
  <div
    class="m-2 mb-3 cursor-pointer rounded-lg border border-primary bg-base-100 p-2 shadow-md hover:bg-base-200"
  >
    <!-- Titulo -->
    <div class="flex">
      <span
        data-testid="entry-day"
        class="text-lg font-bold text-primary"
        >{{ entryDate.day }}</span
      >
      <span
        data-testid="entry-month"
        class="mx-2 text-lg font-semibold text-base-content"
        >{{ entryDate.month }}</span
      >
      <span
        data-testid="entry-year"
        class="mx-1 text-lg font-light text-base-content"
        >{{ entryDate.year }},
      </span>
      <span
        data-testid="entry-dayofweek"
        class="mx-1 text-lg font-light text-base-content"
        >{{ entryDate.dayOfWeek }}.</span
      >
    </div>
    <!-- Descripcion -->
    <div
      data-testid="entry-text"
      class="text-sm text-base-content"
    >
      {{ shortText }}
    </div>
  </div>
</template>

<script setup>
  import getDateParsered from '@/helpers/dateparser.js'
  import { computed } from 'vue'

  const props = defineProps({
    entry: {
      type: Object,
      required: true,
    },
  })

  const shortText = computed(() => {
    return props.entry.text.length > 130
      ? `${props.entry.text.substring(0, 130)}...`
      : props.entry.text
  })

  const entryDate = computed(() => {
    return getDateParsered(props.entry.date)
  })
</script>

<style lang="scss" scoped></style>
