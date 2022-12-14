<template>
  <!-- Me voy a inventar un evento solo para testear -->
  <button
    class="btn btn-primary btn-circle shadow-lg"
    @click="$emit('onClick')"
  >
    <Icon
      :icon="props.icon"
      class="h-6 w-6"
    />
  </button>
</template>

<script setup>
  import { Icon } from '@iconify/vue'

  const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
  })

  defineEmits(['onClick'])

  // console.log('props', props.icon)
</script>

<style lang="scss" scoped></style>
