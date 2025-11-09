import { getPool } from "../db/config";
import { Review } from "../types/reviews.types";

export const getAllReviews = async () => {
  const pool = await getPool();
  const result = await pool.query("SELECT * FROM Reviews");
  return result.recordset;
};


export const getReviewById = async (reviewId: number) => {
  const pool = await getPool();
  const result = await pool
  .request()
  .input("reviewId", reviewId)
  .query("SELECT * FROM Reviews WHERE reviewId = @reviewId    ");
  return result.recordset[0];
};

export const createReview = async (reviewData: Review) => {
    const pool = await getPool();
    const result = await pool
    .request()
    .input("productId", reviewData.productId)
    .input("userId", reviewData.userId)
    .input("rating", reviewData.rating)
    .input("comment", reviewData.comment)
    .query('INSERT INTO Reviews (productId, userId, rating, comment) VALUES (@productId, @userId, @rating, @comment); SELECT SCOPE_IDENTITY() AS reviewId;');
    return result.recordset[0];
}
