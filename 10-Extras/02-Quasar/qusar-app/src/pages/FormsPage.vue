<template>
  <q-page class="q-ma-md">
    <span class="text-h3">Forms</span>
    <q-separator spaced />

    <div
      class="q-pa-md row justify-center"
    >
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md col-8"
      >
        <q-input
          filled
          v-model="name"
          label="Tu Nombre *"
          hint="Nombre y Apellidos"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'No puede estar vacío']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Tu Edad *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Indica tu edad',
            (val) => (val > 0 && val < 100) || 'Indica una edad real',
          ]"
        />

        <q-toggle
          v-model="accept"
          label="Acepto los términos y licencias"
        />

        <div>
          <q-btn
            label="Aceptar"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  const $q = useQuasar()

  const name = ref(null)
  const age = ref(null)
  const accept = ref(false)

  const onSubmit = () => {
    if (accept.value !== true) {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Necesita aceptar los términos de licencia primero',
      })
    } else {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: `Enviado ${  name.value  } con edad ${  age.value}` ,
      })
    }
  }

  const onReset = () => {
    name.value = null
    age.value = null
    accept.value = false
  }
</script>
