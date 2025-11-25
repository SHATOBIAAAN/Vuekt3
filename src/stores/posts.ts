import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Post, Comment } from '@/types'

/**
 * Store для управления постами и комментариями
 */
export const usePostsStore = defineStore('posts', () => {
  // State
  const posts = ref<Post[]>([
    {
      id: 1,
      title: 'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.',
      comments: [
        { id: 1, text: 'Самый яркий комментарий в этом посте' },
        { id: 2, text: 'Один из бессмысленный комментарий в этом посте' }
      ]
    },
    {
      id: 2,
      title: 'Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока',
      comments: [{ id: 1, text: 'Очень научно и непонятно' }]
    }
  ])

  // Getters
  const postsCount = computed(() => posts.value.length)
  const totalComments = computed(() => 
    posts.value.reduce((sum: number, post: Post) => sum + post.comments.length, 0)
  )

  // Actions
  const addPost = (title: string): void => {
    const newPost: Post = {
      id: Date.now(),
      title,
      comments: []
    }
    posts.value.push(newPost)
  }

  const deletePost = (id: number): void => {
    posts.value = posts.value.filter((post: Post) => post.id !== id)
  }

  const updatePost = (id: number, newTitle: string): void => {
    const post = posts.value.find((p: Post) => p.id === id)
    if (!post) {
      console.warn(`Post with id ${id} not found`)
      return
    }
    post.title = newTitle
  }

  const addComment = (postId: number, text: string): void => {
    const post = posts.value.find((p: Post) => p.id === postId)
    if (!post) {
      console.warn(`Post with id ${postId} not found`)
      return
    }
    
    const newComment: Comment = {
      id: Date.now(),
      text
    }
    post.comments.push(newComment)
  }

  const deleteComment = (postId: number, commentId: number): void => {
    const post = posts.value.find((p: Post) => p.id === postId)
    if (!post) {
      console.warn(`Post with id ${postId} not found`)
      return
    }
    post.comments = post.comments.filter((c: Comment) => c.id !== commentId)
  }

  return {
    // State
    posts,
    // Getters
    postsCount,
    totalComments,
    // Actions
    addPost,
    deletePost,
    updatePost,
    addComment,
    deleteComment
  }
})
