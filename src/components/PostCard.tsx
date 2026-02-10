import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { PostSummary } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { getPostDetailPath, getProfilePath } from "@/constants";
import { formatDateShort, getDisplayName } from "@/utils/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LikeButton from "./LikeButton";

interface PostCardProps {
  post: PostSummary;
}

const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(getPostDetailPath(post.id));
  }, [navigate, post.id]);

  return (
    <Card
      className="transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <CardContent className="flex-1 min-w-0">
          {post.category && (
            <Badge variant="secondary" className="mb-3">
              {CATEGORY_LABELS[post.category]}
            </Badge>
          )}

          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>

          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Link
              to={getProfilePath(post.authorId)}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {getDisplayName(post.authorEmail, post.authorDisplayName)}
            </Link>
            <span>·</span>
            <span>{formatDateShort(post.createdAt)}</span>
            <span>·</span>
            <LikeButton postId={post.id} likeCount={post.likeCount} size="sm" />
          </div>
        </CardContent>

        {post.thumbnailUrl && (
          <div className="w-full sm:w-24 sm:h-24 h-40 shrink-0 sm:my-6 sm:mr-6">
            <img
              src={post.thumbnailUrl}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Card>
  );
});

export default PostCard;
