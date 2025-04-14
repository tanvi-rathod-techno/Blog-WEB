import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { IconProps } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { IconHeart, IconMessageCircle, IconTrash, IconEdit, IconHeartFilled } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { dashboardService } from '@/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

interface BlogsCardProps {
  id: number
  title: string
  value: string
  icon: React.ReactElement<IconProps>
  userName: string
  imageUrl: string
  profileImageUrl: string
  likesCount: number
  commentsCount: number
  likedByUser?: boolean
  total_likes: number
  onDelete: (id: number) => void
  onEdit: () => void
  onLike: () => void
  onAddComment(): (comment: string) => void
}

interface Comment {
  id: number
  comment: string
  created_at: string
  user: {
    name: string
  }
}
dayjs.extend(relativeTime)
export const BlogsCard: React.FC<BlogsCardProps> = ({
  id,
  title,
  value,
  icon,
  userName,
  likesCount,
  commentsCount,
  likedByUser,
  imageUrl,
  profileImageUrl,
  onDelete,
  onEdit,
  onLike,
  onAddComment
}) => {
  const [commentText, setCommentText] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  const fetchComments = async () => {
    try {
      const res = await dashboardService.getCommentBlog(id)
      if (res?.status) {
        setComments(res.response)
      } else {
        console.error('Failed to fetch comments', res?.message)
      }
    } catch (error) {
      console.error('Failed to fetch comments', error)
    }
  }
  

  const handleOpenComment = () => {
    setIsCommenting(true)
    fetchComments()
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(commentText); // make sure this executes without error
    setCommentText('');
    fetchComments();
    setIsCommenting(false); // this will close the Dialog
  }

  return (
    <>
      <Card className="w-full">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <img
              src={profileImageUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <CardTitle className="text-sm font-medium">{userName}</CardTitle>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {icon}
            {onEdit && (
              <button
                className="text-muted-foreground hover:text-yellow-600 transition"
                onClick={onEdit}
                title="Edit Post"
              >
                <IconEdit size={18} stroke={1.5} />
              </button>
            )}
            {onDelete && (
              <button
                className="text-muted-foreground hover:text-red-600 transition"
                onClick={() => onDelete(id)}
                title="Delete Post"
              >
                <IconTrash size={18} stroke={1.5} />
              </button>
            )}
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <div className="text-sm font-bold mb-2">{value}</div>
          <img
            src={imageUrl}
            alt="Blog Media"
            className="w-full h-40 object-cover rounded-md"
          />
        </CardContent>

        <CardFooter className="flex flex-col items-start text-xs text-muted-foreground gap-2">
          {/* Like and comment toggle row */}
          <div className="flex items-center gap-4 w-full">
            <button
              className="flex items-center gap-1 hover:text-red-600 transition"
              onClick={onLike}
            >
              {likedByUser ? (
                <IconHeartFilled size={16} stroke={1.5} className="text-red-500" />
              ) : (
                <IconHeart size={16} stroke={1.5} />
              )}
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleOpenComment}
              className="text-xs text-blue-500 hover:underline flex items-center gap-1"
            >
              <IconMessageCircle size={16} stroke={1.5} />
              <span>{commentsCount}</span>
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* 🟦 Comment Modal */}
      <Dialog open={isCommenting} onOpenChange={setIsCommenting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>

          {/* Comments List */}
          <div className="max-h-40 overflow-y-auto space-y-2 text-sm mb-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="border rounded-md p-2 bg-gray-100">
                  <strong>{c.user.name}</strong>
                  <p className="text-gray-600">{c.comment}</p>
                  <span className="text-xs text-muted-foreground">
                  {dayjs(c.created_at).fromNow()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No comments yet.</p>
            )}
          </div>

          {/* Add Comment */}
          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows={3}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button onClick={handleCommentSubmit} size="sm">Post</Button>
            <Button onClick={() => setIsCommenting(false)} variant="ghost" size="sm">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
