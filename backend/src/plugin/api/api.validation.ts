import * as Joi from "joi";

export const apiPayload = {
  payload: {
    phrase: Joi.string(),
  },
};
