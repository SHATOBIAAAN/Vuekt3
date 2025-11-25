<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="emit('close')">
        <div class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-100 dark:border-slate-700">
          <div v-if="title" class="mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
