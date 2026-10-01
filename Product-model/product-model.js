import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    price: Joi.number().float().min(0.1).positive().decimal(2).required(),
    stockQuantity: Joi.number().integer().min(1).required(),
})

export default productSchema;