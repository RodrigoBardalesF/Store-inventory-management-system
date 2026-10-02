import Joi from "joi";

const validator = (schema) => (data) => {
    return schema.validate(data, { abortEarly: false })
};

const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(50).required(),
    price: Joi.number().min(0.1).positive().required(),
    stockQuantity: Joi.number().integer().min(0).positive().required(),
    discount: Joi.number().min(0).positive().max(100).optional()
});

const searchNameSchema = Joi.string().min(2).max(100).required();
const inputQuantitySchema = Joi.number().integer().min(1).positive().required();

const validateNewProduct = validator(productSchema);
const validateProductName = validator(searchNameSchema);
const validateInputQuantity = validator(inputQuantitySchema);

export { validateNewProduct, validateProductName, validateInputQuantity };