import * as reviewsRepository from "../repository/reviews.repository";

export const fetchAllReviews = async () => {
  return await reviewsRepository.getAllReviews();
};

export const fetchReviewById = async (reviewId: number) => {
  return await reviewsRepository.getReviewById(reviewId);
};

export const addNewReview = async (reviewData: any) => {
    return await reviewsRepository.createReview(reviewData);
}