import {
  SET_HUSTLR_CARD_REVIEWS,
  SET_NEXT_HUSTLR_CARD_REVIEWS,
  REMOVE_HUSTLR_CARD_REVIEWS_STATE,
  CREATE_HUSTLR_CARD_REVIEW,
  UPDATE_HUSTLR_CARD_REVIEW,
  DELETE_HUSTLR_CARD_REVIEW,
  DELETE_HUSTLR_CARD_REVIEW_PHOTO_ARRAY,
} from "../../actions/hustlrCard/hustlrCardReviews";

const initialState = {
  reviews: [],
  totalPages: null,
  addedReviewId: null,
  reviewWasDeleted: false,
};

const hustlrCardReviews = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_HUSTLR_CARD_REVIEWS_STATE:
      return {
        reviews: [],
        totalPages: null,
        addedReviewId: null,
        reviewWasDeleted: false,
      };

    case SET_HUSTLR_CARD_REVIEWS:
      return {
        ...state,
        reviews: action.hustlrCardReviews,
        totalPages: action.totalPages,
      };

    case SET_NEXT_HUSTLR_CARD_REVIEWS:
      return {
        ...state,
        reviews: [...state.reviews, ...action.nextHustlrCardReviews],
      };

    case CREATE_HUSTLR_CARD_REVIEW:
      return {
        ...state,
        reviews: [action.review, ...state.reviews],
        addedReviewId: action.review.id,
      };

    case UPDATE_HUSTLR_CARD_REVIEW:
      const updatedHustlrCardReviews = [...state.reviews];
      const updateReviewIndex = updatedHustlrCardReviews.findIndex(
        (review) => review.id === action.review.id
      );
      updatedHustlrCardReviews[updateReviewIndex] = action.review;

      return {
        ...state,
        reviews: updatedHustlrCardReviews,
      };

    case DELETE_HUSTLR_CARD_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review.id !== action.reviewId
        ),
        reviewWasDeleted: true,
      };

    case DELETE_HUSTLR_CARD_REVIEW_PHOTO_ARRAY:
      const newHustlrCardReviews = [...state.reviews];
      const deletePhotoReviewIndex = newHustlrCardReviews.findIndex(
        (review) => review.id === action.reviewId
      );
      const review = newHustlrCardReviews.find(
        (review) => review.id === action.reviewId
      );
      const newReviewPhotos = review.photos.filter(
        (photo) => photo.id !== action.photoId
      );
      review.photos = newReviewPhotos;
      newHustlrCardReviews[deletePhotoReviewIndex] = review;

      return {
        ...state,
        reviews: newHustlrCardReviews,
      };

    default:
      return state;
  }
};

export default hustlrCardReviews;
