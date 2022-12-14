<template>
  <q-page class="q-pa-md">
    <span class="text-h3">Dialog</span>
    <q-separator spaced />

    <span
      v-if="name"
      class="text-h4"
      >Nombre: {{ name }}</span
    >
    <q-separator spaced />

    <div class="q-pa-md q-gutter-sm">
      <q-btn
        label="Alert"
        color="primary"
        @click="alert"
      />
      <q-btn
        label="Confirm"
        color="primary"
        @click="confirm"
      />
      <q-btn
        label="Prompt"
        color="primary"
        @click="prompt"
      />
    </div>
  </q-page>
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  const $q = useQuasar()
  const name = ref('')

  const alert = () => {
    $q.dialog({
      title: 'Alert',
      message: 'Some message',
    })
      .onOk(() => {
        console.log('OK')
      })
      .onCancel(() => {
        console.log('Cancel')
      })
      .onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
  }

  const confirm = () => {
    $q.dialog({
      title: 'Confirm',
      message: 'Would you like to turn on the wifi?',
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        console.log('>>>> OK')
      })
      .onOk(() => {
        console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
  }

  const prompt = () => {
    $q.dialog({
      title: 'Prompt',
      message: 'What is your name?',
      prompt: {
        model: '',
        type: 'text', // optional
      },
      cancel: true,
      persistent: true,
    })
      .onOk((data) => {
        console.log('>>>> OK, received', data)
        name.value = data
        $q.notify({
          type: 'info',
          message: `Hola ${name.value}`,
        })
      })
      .onCancel(() => {
        console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
  }
</script>
