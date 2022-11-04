<template>
  <div>
    <p>Página de detalle con id:</p>
    <h4>Props: {{ props.id }}</h4>
    <h4>FullPath: {{ route.fullPath }}</h4>
    <h4>Param Id: {{ route.params.id }}</h4>
    <h4>Query: {{ route.query }}</h4>
  </div>
</template>

<script setup>
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'

  // Vamos a pasarle unas propiedades!!!
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  })
  // Si necesito atributos necesito setup

  // Para obtener información de la ruta
  const route = useRoute()

  console.log('Mi propiedad', props.id)

  console.log('Mi path', route.fullPath)
  console.log('Mis param', route.params.id)
  console.log('Mi query', route.query)

  // Watcher sobre una prop en concreto
  watch(
    () => props.id,
    async () => {
      console.log('Cambio la propiedad')
      // podemos consultar una api o lo que sea por el detalle
    }
  )
</script>

<style lang="scss" scoped></style>
