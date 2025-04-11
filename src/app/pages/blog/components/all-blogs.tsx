// components/blogs.tsx
import { useQuery ,useMutation ,useQueryClient } from '@tanstack/react-query'
import { dashboardService } from '@/api'
import { Skeleton } from '@/components/ui/skeleton'
import { BlogsCard } from './blogs-card'
import { toast } from '@/components/ui/use-toast'
import { BlogForm } from './blogs-form'
import { useState } from 'react'

	export const AllBlogs = () => {
    const queryClient = useQueryClient()
    const [editBlog, setEditBlog] = useState<any | null>(null) 
    const [isFormOpen, setIsFormOpen] = useState(false)
  const { isLoading, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await dashboardService.getBlogs(),
    refetchOnMount: true,
  })

   // Delete blog mutation
   const deleteMutation = useMutation({
    mutationFn: (id: number) => dashboardService.deleteBlog(id), // Use your actual delete method
    onSuccess: (response : any) => {
     toast({
      title: response.message || 'Blog deleted successfully!',
    })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error :any) => {
      toast({
        title: 'Failed to delete blog.',
        description: error?.response?.data?.message || '',
        variant: 'destructive',
      })
    }
  })

  const getProfileImage = (userName: string, userId: number) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=128&format=png&rounded=true`
  }
  
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleEdit = (blog: any) => {
    setEditBlog(blog)
    setIsFormOpen(true)
  }

  if (isLoading) {
    return (
      <>
        <Skeleton className='h-32 rounded-xl' />
        <Skeleton className='h-32 rounded-xl' />
        <Skeleton className='h-32 rounded-xl' />
        <Skeleton className='h-32 rounded-xl' />
      </>
    )
  }

  if (!data?.response?.length) {
    return <p>No blogs available.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.response.map((blog) => (
        <BlogsCard
          key={blog.id}
          id={blog.id} 
          title={blog.blog_title}
          value={blog.blog_tagline} 
          userName={blog.user?.name}
          imageUrl={`https://picsum.photos/400/200?random=${blog.id}`}
          profileImageUrl={getProfileImage(blog.user?.name || 'Unknown', blog.user?.id)}
          likesCount={blog.total_likes}
          likedByUser={blog.liked_by_user}
          commentsCount={45}
          onDelete={handleDelete}
            onEdit={() => handleEdit({ 
            id: blog.id, 
            blog_title: blog.blog_title, 
            blog_content: blog.blog_content 
          })}
        />
      ))}

    {isFormOpen && editBlog && (
      <>
        <BlogForm
          key={editBlog?.id || 'new'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={editBlog}
        />
      </>
    )}


    </div>

    
  )
}
