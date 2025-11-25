/**
 * Интерфейс комментария к посту
 */
export interface Comment {
  id: number
  text: string
}

/**
 * Интерфейс поста в дневнике
 */
export interface Post {
  id: number
  title: string
  comments: Comment[]
}
