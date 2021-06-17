import * as Joi from "joi";
import { BaseModel, baseValidation } from "./base.model";

export type Phrase = BaseModel & {
  id: string;
  phrase: string;
};

export const phraseValidation = baseValidation.keys({
  id: Joi.string(),
  phrase: Joi.string(),
});
