import {
  BACKDROP_IMAGE_UPLOADED_SUCCESSFULLY,
  BACKDROP_IMAGE_UPLOADED_UNSUCCESSFULLY,
  BACKDROP_IMAGE_DELETED_SUCCESSFULLY,
  BACKDROP_IMAGE_DELETED_UNSUCCESSFULLY,
  HIDE_BACKDROP_IMAGE_UPLOADED_NOTIFICATION,
  HIDE_BACKDROP_IMAGE_DELETED_NOTIFICATION,
} from "../../actions/notifications/backdropImageNotifications";

const intialState = {
  uploaded: {
    show: false,
    success: false,
    message: "",
  },
  deleted: {
    show: false,
    success: false,
    message: "",
  },
};

const backdropImageNotifications = (state = intialState, action) => {
  switch (action.type) {
    case BACKDROP_IMAGE_UPLOADED_SUCCESSFULLY:
      return {
        ...state,
        uploaded: {
          show: true,
          success: true,
          message: "Your backdrop image was uploaded!",
        },
      };

    case BACKDROP_IMAGE_UPLOADED_UNSUCCESSFULLY:
      return {
        ...state,
        uploaded: {
          show: true,
          success: false,
          message: "Oops, something went wrong. Try again later.",
        },
      };

    case HIDE_BACKDROP_IMAGE_UPLOADED_NOTIFICATION:
      return {
        ...state,
        uploaded: {
          show: false,
          success: undefined,
          message: "",
        },
      };

    case BACKDROP_IMAGE_DELETED_SUCCESSFULLY:
      return {
        ...state,
        deleted: {
          show: true,
          success: true,
          message: "Your backdrop image was deleted!",
        },
      };

    case BACKDROP_IMAGE_DELETED_UNSUCCESSFULLY:
      return {
        ...state,
        deleted: {
          show: true,
          success: false,
          message: "Oops, something went wrong. Try again later.",
        },
      };

    case HIDE_BACKDROP_IMAGE_DELETED_NOTIFICATION:
      return {
        ...state,
        deleted: {
          show: false,
          success: undefined,
          message: "",
        },
      };

    default:
      return state;
  }
};

export default backdropImageNotifications;
