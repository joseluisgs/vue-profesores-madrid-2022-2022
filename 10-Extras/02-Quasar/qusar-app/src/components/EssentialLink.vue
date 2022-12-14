<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="openLink()"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  })

  const router = useRouter()

  const openLink = () => {
    if (props.link.startsWith('http')) return window.open(props.link, '_blank')
    router.push({ name: props.link })
  }
</script>