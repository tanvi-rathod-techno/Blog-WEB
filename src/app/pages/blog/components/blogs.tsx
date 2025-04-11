import { useQuery ,useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { dashboardService } from '@/api'
import { Skeleton } from '@/components/ui/skeleton'
import { BlogsCard } from './blogs-card'
import { Button } from '@/components/custom/button'


interface BlogsCardProps {
  id: number
  title: string
  value: string
  userName: string
  imageUrl: string
  profileImageUrl: string
  likesCount: number
  likedByUser: boolean
  commentsCount: number
  onLike: () => void
}



export const Blogs = () => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['blogs', page],
    queryFn: async () => await dashboardService.getAllBlogs(page),
    keepPreviousData: true,
    refetchOnMount: true,
  })

  const likeMutation = useMutation({
    mutationFn: (blogId: number) => dashboardService.likeBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', page] })
    },
  })
  
  
  const getProfileImage = (userName: string, userId: number) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=128&format=png&rounded=true`
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

  if (!data?.response?.data?.length) {
    return <p>No blogs available.</p>
  }

  const { current_page, last_page, data: blogs } = data.response

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((blog) => (
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
            onLike={() => likeMutation.mutate(blog.id)}
            commentsCount={45}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <span>Page {current_page} of {last_page}</span>
        <Button disabled={page === last_page} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
