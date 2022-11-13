<template>
  <button
    @click="openModal"
    data-cy="open-button"
  >
    Abrir modal
  </button>

  <Teleport to="body">
    <div
      v-show="open"
      class="modal"
      data-cy="modal-body"
    >
      <div
        class="content"
        data-cy="modal-content"
        :style="{ backgroundColor: contentColor }"
      >
        <div data-cy="default-slot">
          <slot>
            <p>¡Hola desde Modal!</p>
          </slot>
        </div>
        <div data-cy="extra-slot">
          <slot name="extra"></slot>
        </div>
        <button
          @click="closeModal"
          data-cy="close-modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    color: String,
  })

  const emit = defineEmits(['modalOpened', 'modalClosed'])
  const open = ref(false)
  const contentColor = props.color ? props.color : 'white'

  const openModal = () => {
    open.value = true
    emit('modalOpened')
  }

  const closeModal = () => {
    open.value = false
    emit('modalClosed')
  }
</script>
<style scoped>
  .modal {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal > .content {
    width: fit-content;
    padding: 2rem;
  }
</style>
