import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { IconProps } from '@tabler/icons-react'
import React from 'react'
import { IconHeart, IconMessageCircle,IconTrash ,IconEdit ,IconHeartFilled} from '@tabler/icons-react'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useState } from 'react'

interface BlogsCardProps {
  id: number
  title: string
  value: string
  icon: React.ReactElement<IconProps>
  userName: string
  imageUrl: string //  New prop for the image
  profileImageUrl: string
  likesCount: number
  commentsCount: number
  likedByUser?: boolean
  onDelete: () => void
  onEdit: () => void
  onLike: () => void 
}

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
  onLike
}) => {

  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
  })

  const handleDelete = () => {
    setConfirmDelete({ isOpen: true })
  }

  const confirmDeletePost = () => {
    onDelete(id)
    setConfirmDelete({ isOpen: false })
  }

  return (
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
                    onClick={handleDelete}
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

      {/* Footer */}
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
           <div className="flex items-center gap-4">
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
             <button className="flex items-center gap-1 hover:text-blue-600 transition">
               <IconMessageCircle size={16} stroke={1.5} />
               <span>{commentsCount}</span>
             </button>
           </div>
           
         </CardFooter>


      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDelete.isOpen}
        message="Are you sure you want to delete this post?"
        onConfirm={confirmDeletePost}
        confirmBtnText="Delete"
        closeBtnText="No"
        onClose={() => setConfirmDelete({ isOpen: false })}
      />

    </Card>
  )
}
