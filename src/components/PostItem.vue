<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '@/types'
import CommentList from '@/components/CommentList.vue'

const props = defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'edit', post: Post): void
  (e: 'add-comment', postId: number, text: string): void
  (e: 'delete-comment', postId: number, commentId: number): void
}>()

const showComments = ref(false)
const newCommentText = ref('')

const toggleComments = () => {
  showComments.value = !showComments.value
}

const handleAddComment = () => {
  if (newCommentText.value.trim()) {
    emit('add-comment', props.post.id, newCommentText.value)
    newCommentText.value = ''
  }
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-300">
    <div class="p-6">
      <div class="mb-6">
        <p class="text-gray-800 dark:text-gray-100 text-lg leading-relaxed font-medium">{{ post.title }}</p>
      </div>

      <div class="flex items-center gap-3 border-t border-gray-100 dark:border-slate-700 pt-4">
        <button 
          @click="toggleComments"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          {{showComments ? 'Скрыть комментарии' : 'Комментарии' }}
          <span class="bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 px-1.5 py-0.5 rounded-full text-xs">{{ post.comments.length }}</span>
        </button>

        <div class="flex-1"></div>

        <button 
          @click="emit('edit', post)"
          class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          title="Редактировать"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button 
          @click="emit('delete', post.id)"
          class="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          title="Удалить"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="showComments" class="bg-gray-50/50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-700 p-6 pt-4">
      <div class="mb-4">
        <CommentList 
          :comments="post.comments" 
          @delete-comment="(commentId) => emit('delete-comment', post.id, commentId)"
        />
        <div v-if="post.comments.length === 0" class="text-center text-gray-400 dark:text-gray-500 text-sm py-2">
          Нет комментариев
        </div>
      </div>

      <div class="flex gap-3">
        <input 
          v-model="newCommentText"
          @keyup.enter="handleAddComment"
          type="text" 
          placeholder="Написать комментарий..." 
          class="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
        >
        <button 
          @click="handleAddComment"
          :disabled="!newCommentText.trim()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>
