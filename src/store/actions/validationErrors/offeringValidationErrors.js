export const SET_OFFERING_VALIDATION_ERRORS = "SET_OFFERING_VALIDATION_ERRORS";
export const REMOVE_OFFERING_VALIDATION_ERRORS =
  "REMOVE_OFFERING_VALIDATION_ERRORS";

export const clearOfferingValidationErrors = () => {
  return {
    type: REMOVE_OFFERING_VALIDATION_ERRORS,
  };
};
