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
  onAddComment: (comment: string) => void

}


const BLOG_LIMIT = 12;
export const Blogs = () => {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ['blogs', page,BLOG_LIMIT],
    queryFn: async () => await dashboardService.getAllBlogs(page,BLOG_LIMIT),
    keepPreviousData: true,
    refetchOnMount: true,
  })

  const likeMutation = useMutation({
    mutationFn: (blogId: number) => dashboardService.likeBlog(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', page] })
    },
  })
  
  const commentMutation = useMutation({
    mutationFn: (data: { blog_id: number; comment: string }) =>
      dashboardService.commentBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', page] });
    },
  });
  
  
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

  const { data: blogs, current_page, total, next_page_url, prev_page_url } = data?.response || {}
  const totalPages = Math.ceil(total / BLOG_LIMIT);

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
            created_at={blog.created_at}
            onAddComment={(comment) =>
              commentMutation.mutate({ blog_id: blog.id, comment }) 
            }
            commentsCount={blog.total_comments || 0} 
          />
        ))}
      </div>
        {/* Pagination Controls */}
        <div className="flex justify-between mt-6 items-center">
                <Button
                  disabled={!prev_page_url || isFetching}
                  onClick={() => {
                    setPage((prev) => Math.max(prev - 1, 1))
                  }}
                >
                  Previous
                </Button>
                <span className="text-sm">Page {current_page} of {totalPages}</span>
                <Button
                  disabled={!next_page_url || isFetching}
                  onClick={() => {
                    setPage((prev) => prev + 1)
                  }}
                >
                  Next
                </Button>
              </div>

              {isFetching && <p className="text-center text-xs mt-2">Loading...</p>}
            </div>
   
  )
}
