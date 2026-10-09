import { loadInventoryFromFile, saveInventoryToFile } from "../utils/check-inventory.js";
import { validateProductName, validateInputQuantity } from "../models/product.schema.js";
import { createInventory } from "./product-management.js";

const makeOrder = (store) => {

    const currentInventory = store;
    const updateInventory = async (productName, quantity) => {
    try {

    const item = currentInventory.showOneProduct(productName);
    item.quantity = quantity;
    await currentInventory.save();
    console.log("Inventory updated successfully." + "Remaining stock for " + item.name + ": " + item.quantity);
    
    } catch (err) {
        console.error("An error occurred while updating the inventory:", err);
    };
    }

    const calculateSubtotal = (unitPrice, quantity) => {
    const subtotal = unitPrice * quantity;
    if (subtotal >= 500) {
        return subtotal * (1 - 15 / 100);
    }
    else if (subtotal >= 200) {
        return subtotal * (1 - 10 / 100);
    }
    else if (subtotal >= 100) {
        return subtotal * (1 - 5 / 100);
    }
    else {
        return subtotal;
    }
    }

    const createOrder = async (productName, quantity) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    };
    const {error: quantityError, value: quantityValue} = validateInputQuantity(quantity);
    if (quantityError) {
        console.error(quantityError.details);
        return;
    }
    const product = currentInventory.showOneProduct(value);
    const substraction = product.quantity - quantityValue;
    console.log(`Remaining stock for ${product.name}: ${substraction}`);
    if (substraction >= 0) {
        await updateInventory(value, substraction);
        const subtotal = calculateSubtotal(product.price, quantityValue);
        return ({
            productName: product.name,
            orderedQuantity: quantityValue,
            unitPrice: product.price,
            totalPrice: subtotal.toFixed(2)
        })
    } else {
        console.error(`Insufficient stock for ${product.name}. Available quantity: ${product.quantity}. Requested quantity: ${quantity}.`);
    };

    } catch (err) {
        console.error("An error occurred while creating the order:", err);
    };
  };
    return {
        createOrder
    };
};

export  { makeOrder };

