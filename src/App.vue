<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useTheme } from '@/composables/useTheme'
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import type { Post } from '@/types'


const store = usePostsStore()
const { isDark, toggleTheme } = useTheme()

const isModalOpen = ref(false)
const editingPost = ref<Post | null>(null)

const openCreateModal = (): void => {
  editingPost.value = null
  isModalOpen.value = true
}

const openEditModal = (post: Post): void => {
  editingPost.value = post
  isModalOpen.value = true
}
const closeModal = (): void => {
  isModalOpen.value = false
  editingPost.value = null
}

const handleSave = (content: string): void => {
  if (editingPost.value) {
    store.updatePost(editingPost.value.id, content)
  } else {
    store.addPost(content)
  }
  closeModal()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans pb-20 transition-colors duration-300">
    <header class="bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md transition-colors duration-300">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 class="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Дневник
        </h1>
        <div class="flex items-center gap-4">
          <button 
            @click="toggleTheme"
            class="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 rounded-full transition-colors"
            :title="isDark ? 'Светлая тема' : 'Темная тема'"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button 
            @click="openCreateModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
            Написать
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PostList @edit-post="openEditModal" />
    </main>

    <PostForm
      :is-open="isModalOpen"
      :title="editingPost ? 'Редактировать пост' : 'Новый пост'"
      :initial-content="editingPost?.title"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>
