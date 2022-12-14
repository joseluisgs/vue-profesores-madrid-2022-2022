<template>
  <div class="h-[calc(88vh)] border-r border-primary">
    <div class="mr-2 px-2 pt-2">
      <input
        data-testid="entrylist-input"
        v-model.trim="searchTerm"
        type="text"
        placeholder="Buscar entradas"
        class="input input-bordered input-primary w-full rounded-md bg-base-100 text-base-content"
      />
    </div>
    <div class="mx-2 mt-2 flex justify-center">
      <button
        data-testid="entrylist-new"
        class="btn btn-outline btn-primary"
        @click="goToNewEntry()"
      >
        <Icon
          icon="ci:file-new"
          class="mr-2 h-6 w-6"
        />
        Nueva Entrada
      </button>
    </div>
    <div class="scrollbar mt-1 h-[calc(88vh_-_90px)] overflow-y-auto">
      <div>
        <!-- Animaciones -->
        <transition-group
          name="list-complete"
          tag="EntryItem"
        >
          <EntryItem
            data-testid="entrylist-item"
            v-for="entry in entriesByTerm"
            :key="entry.id"
            :entry="entry"
            @click="goToEntry(entry)"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import EntryItem from '../components/EntryItem.vue'
  import JournalStore from '../stores/journal'

  const router = useRouter()
  const journalStore = JournalStore()

  const searchTerm = ref('')

  const entriesByTerm = computed(() => journalStore.getEntriesByTerm(searchTerm.value))

  const goToEntry = (entry) => {
    router.push({ name: 'daybook-entry', params: { id: entry.id } })
  }

  const goToNewEntry = () => {
    router.push({ name: 'daybook-entry', params: { id: 'new' } })
  }
</script>

<style lang="scss" scoped>
  // https://vuejs.org/guide/built-ins/transition-group.html
  .list-complete-item {
    transition: all 0.8s ease;
  }
  .list-complete-enter-from,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: relative;
  }
</style>
