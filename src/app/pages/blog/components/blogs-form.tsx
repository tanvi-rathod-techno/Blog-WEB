import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { dashboardService } from '@/api'
import { blogSchema } from '@/validations/blog.validation' 
import { useQueryClient } from '@tanstack/react-query'

type BlogFormProps = {
  isOpen: boolean
  onClose: (hasChanges?: boolean) => void
  initialData?: {
    id: number
    blog_title: string
    blog_content: string
  }
}


export const BlogForm = ({ isOpen, onClose, initialData }: BlogFormProps) => {
  const [blog_title, setTitle] = useState(initialData?.blog_title || '')
  const [blog_content, setContent] = useState(initialData?.blog_content || '')
  const queryClient = useQueryClient()

  const isEditMode = !!initialData?.id

  const { mutate: saveBlog, isPending } = useMutation({
    mutationFn: (data: { blog_title: string; blog_content: string }) =>
      isEditMode
        ? dashboardService.updateBlog(initialData.id, data)
        : dashboardService.createBlog(data),
    onSuccess: (res) => {
      toast({ title: res.message || (isEditMode ? 'Blog updated' : 'Blog created') })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setTitle('')
      setContent('')
      onClose(true)
    },
    onError: () => {
      toast({
        title: isEditMode ? 'Failed to update blog' : 'Failed to create blog',
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = () => {
    const result = blogSchema.safeParse({ blog_title, blog_content })

    if (!result.success) {
      const errors = result.error.format()
      toast({
        title:
          errors.blog_title?._errors?.[0] ??
          errors.blog_content?._errors?.[0] ??
          'Validation failed',
        variant: 'destructive',
      })
      return
    }

    saveBlog({ blog_title, blog_content })
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Blog' : 'Create Blog'}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Blog Title'
            className='w-full border p-2 rounded'
            value={blog_title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Blog Content'
            className='w-full border p-2 h-32 rounded'
            value={blog_content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (isEditMode ? 'Updating...' : 'Submitting...') : isEditMode ? 'Update' : 'Submit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
