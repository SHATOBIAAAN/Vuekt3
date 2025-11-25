<script setup lang="ts">
import type { Comment } from '@/types'
import CommentItem from '@/components/CommentItem.vue'

defineProps<{
  comments: Comment[]
}>()

const emit = defineEmits<{
  (e: 'delete-comment', id: number): void
}>()
</script>

<template>
  <div class="space-y-1">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @delete="emit('delete-comment', $event)"
    />
  </div>
</template>
