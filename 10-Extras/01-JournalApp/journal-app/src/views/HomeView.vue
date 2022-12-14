<template>
  <div
    data-theme="joseluisgs"
    class="container mx-auto rounded-lg px-3 py-4 text-center shadow-xl"
  >
    <h1 class="cursor-pointer text-xl font-semibold text-gray-500 hover:text-indigo-500">
      This is an home page
    </h1>
    <button
      data-testid="DayButton"
      class="btn btn-primary"
      @click="goToDaybook()"
    >
      DayBook
    </button>
    <button
      data-testid="AboutButton"
      class="btn btn-secondary"
      @click="goToAbout()"
    >
      About
    </button>
    <button
      class="btn btn-outline btn-success"
      @click="openModal"
    >
      Abrir Modal
    </button>
    <article class="prose mx-auto text-center">
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minus quam harum ab
        dolorum laudantium perspiciatis dolores corporis commodi, a quidem. Possimus ipsum magnam
        repellendus ipsam laboriosam architecto mollitia consectetur?.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium eveniet magni deleniti
        eius. Nisi ipsa accusantium voluptatem quis unde sunt, ratione itaque eius atque quia odio
        ab aperiam explicabo! Laboriosam!.
      </p>
      <!-- ... -->
    </article>
  </div>
  <!-- Mi modal -->
  <modal
    v-if="isOpen"
    title="Hola mundo"
    @on-close="closeModal"
  >
    <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
        <button>Salir</button>
        <h2>Titulo del modal</h2> -->
    <template v-slot:body>
      <article class="prose mx-auto my-5 px-5 text-blue-600">
        <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
      </article>
    </template>

    <template v-slot:footer>
      <div class="text-center">
        <button
          class="btn btn-primary"
          @click="closeModal"
        >
          Salir
        </button>
      </div>
    </template>

    <template v-slot:header>
      <h2 class="mx-auto my-5 px-5 text-center text-lg font-bold leading-5 text-blue-600">
        Titulo del modal
      </h2>
    </template>

    <template v-slot:exposed="{ newTitle }">
      <h2 class="mx-auto my-5 px-5 text-center text-lg font-bold leading-5 text-blue-600">
        {{ newTitle }}
      </h2>
    </template>
  </modal>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Modal from '@/components/Modal.vue'

  const router = useRouter()

  const isOpen = ref(false)

  const goToDaybook = () => router.push({ name: 'daybook-no-entry' })
  const goToAbout = () => router.push({ name: 'about' })

  // Para el modal
  const openModal = () => (isOpen.value = true)
  const closeModal = () => (isOpen.value = false)
</script>

<style scooped>
  .btn {
    margin: 10px;
  }
</style>
