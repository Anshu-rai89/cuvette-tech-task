import * as Joi from "joi";

export type BaseModel = {
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
};

export const baseValidation = Joi.object().keys({
  createdOn: Joi.date().optional(),
  createdBy: Joi.string().optional(),
  modifiedOn: Joi.date().optional(),
  modifiedBy: Joi.string().optional(),
});
