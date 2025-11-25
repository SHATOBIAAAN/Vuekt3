<script setup lang="ts">
import type { Comment } from '@/types'

defineProps<{
  comment: Comment
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="group flex items-start justify-between gap-4 py-3 border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors px-2 rounded-lg">
    <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ comment.text }}</p>
    <button 
      @click="emit('delete', comment.id)"
      class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1"
      title="Удалить комментарий"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </button>
  </div>
</template>
