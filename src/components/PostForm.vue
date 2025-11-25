<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const props = defineProps<{
  isOpen: boolean
  initialContent?: string
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', content: string): void
}>()

const content = ref('')

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    content.value = props.initialContent || ''
  }
})

const handleSave = () => {
  if (content.value.trim()) {
    emit('save', content.value)
  }
}
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title || 'Новый пост'" @close="emit('close')">
    <div class="space-y-4">
      <textarea
        v-model="content"
        class="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[150px]"
        placeholder="О чем вы думаете?"
      ></textarea>
      <div class="flex justify-end gap-3">
        <button
          @click="emit('close')"
          class="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          Закрыть
        </button>
        <button
          @click="handleSave"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!content.trim()"
        >
          Сохранить
        </button>
      </div>
    </div>
  </BaseModal>
</template>
