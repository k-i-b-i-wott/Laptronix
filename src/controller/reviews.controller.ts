import * as reviewsServices from '../service/reviews.services';

import { Request,Response } from 'express';


export const getReviews = async (req:Request,res:Response) => {
    try {
        const reviews = await reviewsServices.fetchAllReviews();
        res.status(200).json(reviews);        
    } catch (error:any) {
        res.status(500).json({"Internal server error":error.message});         
    }
}

export const getReview = async (req:Request,res:Response) => {
    const reviewId = parseInt(req.params.id);   
    try {
        const review = await reviewsServices.fetchReviewById(reviewId);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error:any) {
        res.status(500).json({"Internal server error":error.message});
    }
}
export const createReview = async (req:Request,res:Response) => {
    const reviewData = req.body;
    try {
        const newReview = await reviewsServices.addNewReview(reviewData);
        res.status(201).json(newReview);
    } catch (error:any) {
        res.status(500).json({"Internal server error":error.message});
    }
}