import { loadInventoryFromFile, saveInventoryToFile } from "../utils/check-inventory.js";
import { validateProductName, validateInputQuantity } from "../models/product.schema.js";


const updateInventory = async (inventory, productName, quantity, filePath) => {
    try {

    const item =inventory.find(item => item.name.toLowerCase() === productName.toLowerCase());
    //console.log(item);
    item.quantity = quantity;
    //console.log(item);
    await saveInventoryToFile(filePath, inventory);
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

const createOrder = async (productName, quantity, filePath) => {
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
    const listInventory = await loadInventoryFromFile(filePath);
    const product = listInventory.find(item => item.name.toLowerCase() === value.toLowerCase());
    const substraction = product.quantity - quantityValue;
    console.log(`Remaining stock for ${product.name}: ${substraction}`);
    if (substraction >= 0) {
        await updateInventory(listInventory, value, substraction, filePath);
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

export default createOrder;

