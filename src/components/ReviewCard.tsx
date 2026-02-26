import type { Database } from '../lib/database.types';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-author">
          <div className="review-card-avatar">
            {review.author_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="review-card-name">{review.author_name}</h4>
            <p className="review-card-date">{formatDate(review.created_at)}</p>
          </div>
        </div>
        <div className="review-card-rating">
          {renderStars(review.rating)}
        </div>
      </div>

      {review.title && <h3 className="review-card-title">{review.title}</h3>}

      <p className="review-card-content">{review.content}</p>

      {review.visit_date && (
        <p className="review-card-visit">Visited: {formatDate(review.visit_date)}</p>
      )}
    </div>
  );
}
