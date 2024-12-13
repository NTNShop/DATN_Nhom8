import React, { useState } from 'react';
import { ReviewService } from '../../../services/client/Reviews';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const ProductReview = ({ order, onReviewSubmitted }) => {
  const [reviews, setReviews] = useState(
    order.items.map(item => ({
      product_id: item.product.id,
      order_id: order.id,
      rating: 0,
      review_content: '',
      productName: item.product.name,
      payment_method: order.payment_status === "2" ? 'vnpay' : 'cod'
    }))
  );

  const handleRatingClick = (productIndex, rating) => {
    setReviews(prevReviews => {
      const newReviews = [...prevReviews];
      newReviews[productIndex] = {
        ...newReviews[productIndex],
        rating
      };
      return newReviews;
    });
  };

  const handleContentChange = (productIndex, content) => {
    setReviews(prevReviews => {
      const newReviews = [...prevReviews];
      newReviews[productIndex] = {
        ...newReviews[productIndex],
        review_content: content
      };
      return newReviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateReviews()) {
      return;
    }

    try {
      const reviewData = {
        reviews: reviews.map(review => ({
          ...review,
          payment_info: {
            method: review.payment_method,
            status: order.payment_status,
            order_code: order.order_code
          }
        }))
      };

      const response = await ReviewService.createReview(reviewData);
      
      if (response.status === 'success') {
        toast.success('Đánh giá sản phẩm thành công!');
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'Products already reviewed') {
        toast.error('Sản phẩm đã được đánh giá trước đó');
      } else {
        toast.error(error.message || 'Có lỗi xảy ra khi gửi đánh giá');
      }
    }
  };

  const validateReviews = () => {
    const invalidReviews = reviews.filter(
      review => !review.rating || !review.review_content.trim()
    );

    if (invalidReviews.length > 0) {
      toast.error('Vui lòng điền đầy đủ đánh giá và nội dung cho tất cả sản phẩm');
      return false;
    }

    return true;
  };

  return (
    <div className="product-review-form">
      <form onSubmit={handleSubmit} noValidate>
        {reviews.map((review, index) => (
          <div key={index} className="review-item mb-4 p-3" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
            <h5 className="mb-3">{review.productName}</h5>
            
            <div className="rating-container mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2">Đánh giá: </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className="star"
                    color={star <= review.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                    style={{ marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => handleRatingClick(index, star)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="mb-2">Nội dung đánh giá:</label>
              <textarea
                className="form-control"
                rows="3"
                value={review.review_content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm (tối thiểu 10 ký tự)"
                minLength="10"
                required
              />
            </div>
          </div>
        ))}

        <button type="submit" className="site-btn">
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

export default ProductReview;