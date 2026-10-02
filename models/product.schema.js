import Joi from "joi";

const validator = (schema) => (data) => {
    return schema.validate(data, { abortEarly: false })
};

const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0.1).positive().required(),
    stockQuantity: Joi.number().integer().min(0).required(),
    discount: Joi.number().min(0).max(100).optional()
});

const searchNameSchema = Joi.string().min(2).max(100).required();

const validateNewProduct = validator(productSchema);
const validateProductName = validator(searchNameSchema);

export { validateNewProduct, validateProductName };