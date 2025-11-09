import * as reviewsController  from '../controller/reviews.controller';


export const reviewsRoutes = (app:any) => {
    app.get('/reviews',reviewsController.getReviews);
    app.get('/reviews/:id',reviewsController.getReview);
    app.post('/reviews',reviewsController.createReview);
    app.delete('/reviews/:id',reviewsController.deleteReview);

}

