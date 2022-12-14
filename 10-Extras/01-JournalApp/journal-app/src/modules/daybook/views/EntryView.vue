<template>
  <!-- Transicciones me pidde un solo div!!! -->
  <transition
    name="fade"
    mode="out-in"
  >
    <div v-if="myEntry">
      <div class="flex h-20 flex-row items-center justify-between p-2">
        <div>
          <span class="text-lg font-bold text-primary">{{ entryDate.day }}</span>
          <span class="mx-2 text-lg font-semibold text-base-content">{{ entryDate.month }}</span>
          <span class="mx-1 text-lg font-light text-base-content">{{ entryDate.year }}, </span>
          <span class="mx-1 text-lg font-light text-base-content">{{ entryDate.dayOfWeek }}.</span>
        </div>
        <div>
          <input
            v-show="false"
            type="file"
            @change="selectedPicture($event)"
            accept="image/*"
            ref="fileInput"
          />
          <button
            data-testid="entryview-deletebutton"
            v-if="props.id !== 'new'"
            class="btn btn-error mx-2 gap-2"
            @click="deleteEntry()"
          >
            <Icon
              icon="fa:trash"
              :inline="true"
              class="h-5 w-5"
            />
            Borrar
          </button>
          <button
            class="btn btn-primary mx-2 gap-2"
            @click="onSeletedPicture()"
          >
            <Icon
              icon="fa:upload"
              :inline="true"
              class="h-5 w-5"
            />
            Subir foto
          </button>
        </div>
      </div>
      <hr class="border-t border-primary" />
      <div class="flex h-full flex-col px-3">
        <textarea
          data-testid="entryview-textinput"
          v-model.trim="textInput"
          placeholder="¿Qué sucedió hoy?"
          class="ext-base-content textarea textarea-primary my-2 h-full w-full rounded-md bg-base-100"
        ></textarea>
      </div>
      <img
        v-if="imgUrl"
        :src="imgUrl"
        alt="imagen"
        class="fixed right-10 bottom-32 m-2 w-48 rounded-lg border-4 border-base-200 object-cover shadow-xl"
      />
      <FavButton
        data-testid="entryview-savebutton"
        icon="fa-regular:save"
        class="fixed right-10 bottom-14 h-12 w-12 shadow-md"
        @click="saveEntry()"
      />
    </div>
  </transition>
</template>

<script setup>
  import FavButton from '@/components/FabButton.vue'
  import getDateParsered from '@/helpers/dateparser.js'
  import UserStore from '@/stores/users'
  import { Icon } from '@iconify/vue'
  import Swal from 'sweetalert2'
  import { computed, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import JournalStore from '../stores/journal'

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  })

  const router = useRouter()
  const journalStore = JournalStore()
  const userStore = UserStore()

  const myEntry = ref(null) // referencia a mi entrada
  const textInput = ref(null) // referencia al texto de entrada
  const imgUrl = ref(null) // referencia al url de la imagen
  const fileImage = ref(null) // referencia al dichero de la imagen
  const fileInput = ref(null) // referencia al input file

  const loadNewEntry = () => {
    myEntry.value = {
      text: '',
      picture: null,
      date: new Date().toDateString(),
    }
  }

  const checkEntry = () => {
    myEntry.value = journalStore.getEntryById(props.id)
    if (!myEntry.value) {
      // console.log('no existe la entrada')
      router.push({ name: 'daybook-no-entry' })
    }
  }

  const initData = () => {
    textInput.value = myEntry.value.text // el texto siempre será el de la entrada
    imgUrl.value = myEntry.value.picture
    fileImage.value = null
  }

  const loadEntry = () => {
    // Si es new
    if (props.id === 'new') loadNewEntry()
    // Comprobamos que existe
    else checkEntry()
    // Iniciamos los datos
    initData()
  }

  loadEntry()

  const saveNewEntry = async () => {
    // console.log('createEntry')
    let id = String(Date.now()) // Cuidado que todo son string, para luego firebase!!!
    await journalStore.createEntry(
      {
        id: id,
        text: textInput.value,
        picture: myEntry.value.picture,
        date: myEntry.value.date,
        uid: userStore.user.uid,
      },
      fileImage.value
    )
    router.push({ name: 'daybook-entry', params: { id: id } })
  }

  const updateEntry = async () => {
    //console.log('updateEntry')
    await journalStore.updateEntry(
      {
        id: myEntry.value.id,
        text: textInput.value,
        date: myEntry.value.date, // Podriamos poner new Date y obrendríamos la fecha de la actualizacion
        picture: myEntry.value.picture,
        uid: userStore.user.uid,
      },
      fileImage.value
    )
  }

  const saveEntry = async () => {
    // No podemos dejar el campo vacío
    if (textInput.value.trim() === '') {
      Swal.fire({
        title: '¡No puedes dejar el campo vacío!',
        text: 'Por favor, escribe algo en el campo de texto.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      })
      return
    }

    // Comenzamos
    new Swal({
      title: 'Espere por favor',
      allowOutsideClick: false,
    })
    Swal.showLoading()
    if (props.id === 'new') {
      saveNewEntry()
    } else {
      updateEntry()
    }
    Swal.fire('¡Listo!', 'La entrada se ha guardado correctamente', 'success')
  }

  const deleteEntry = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar la entrada una vez borrada!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sí, borrar',
    })
    if (isConfirmed) {
      Swal.fire({
        title: 'Espere por favor',
        allowOutsideClick: false,
      })
      Swal.showLoading()
      await journalStore.deleteEntry(myEntry.value)
      router.push({ name: 'daybook-no-entry' })
      Swal.fire('¡Listo!', 'La entrada se ha eliminado correctamente', 'success')
    }
  }

  const selectedPicture = (event) => {
    fileImage.value = event.target.files[0]
    if (!fileImage.value) {
      imgUrl.value = null
      fileImage.value = null
      return
    }
    const reader = new FileReader()
    reader.onload = () => (imgUrl.value = reader.result)
    reader.readAsDataURL(fileImage.value)
  }

  const onSeletedPicture = () => fileInput.value.click()

  // La fecha es computada
  const entryDate = computed(() => {
    return getDateParsered(myEntry.value.date)
  })

  // Compruebo que existe la entrada añado un watcher!!
  watch(
    () => props.id,
    () => {
      loadEntry()
    }
  )

  // Observamos el id y sus cambios
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
