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

interface BlogsCardProps {
  id: number
  title: string
  value: string
  icon: React.ReactElement<IconProps>
  userName: string
  imageUrl: string //  New prop for the image
  profileImageUrl: string
  likesCount: number
  likedByUser?: boolean
  total_likes: number
  onDelete: (id: number) => void
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
  likedByUser,
  imageUrl,
  profileImageUrl,
  onDelete,
  onEdit,
  onLike
}) => {
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
          <span>Comment</span>
        </button>
      </div>
      
    </CardFooter>
    </Card>
  )
}
