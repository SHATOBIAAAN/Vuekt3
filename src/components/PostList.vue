<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
import type { Post } from '@/types'
import PostItem from '@/components/PostItem.vue'

const store = usePostsStore()
const { posts } = storeToRefs(store)

const emit = defineEmits<{
  (e: 'edit-post', post: Post): void
}>()

const handleDeletePost = (id: number) => {
  store.deletePost(id)
}

const handleAddComment = (postId: number, text: string) => {
  store.addComment(postId, text)
}

const handleDeleteComment = (postId: number, commentId: number) => {
  store.deleteComment(postId, commentId)
}
</script>

<template>
  <div class="space-y-6">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @delete="handleDeletePost"
      @edit="(p) => emit('edit-post', p)"
      @add-comment="handleAddComment"
      @delete-comment="handleDeleteComment"
    />
    
    <div v-if="posts.length === 0" class="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
      <p class="text-gray-500 dark:text-gray-400 text-lg">Пока нет ни одного поста</p>
      <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Нажмите кнопку "Написать", чтобы создать первый пост</p>
    </div>
  </div>
</template>
