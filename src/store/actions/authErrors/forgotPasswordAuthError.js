export const SET_FORGOT_PASSWORD_AUTH_ERROR = "SET_FORGOT_PASSWORD_AUTH_ERROR";
export const REMOVE_FORGOT_PASSWORD_AUTH_ERROR =
  "REMOVE_FORGOT_PASSWORD_AUTH_ERROR";

export const clearForgotPasswordAuthError = () => {
  return {
    type: REMOVE_FORGOT_PASSWORD_AUTH_ERROR,
  };
};