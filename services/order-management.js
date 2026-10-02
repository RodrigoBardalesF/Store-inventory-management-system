import { loadInventoryFromFile, saveInventoryToFile } from "../utils/check-inventory.js";
import { validateProductName } from "../models/product.schema.js";


const updateInventory = async (inventory, productName, quantity, filePath) => {
    try {

    const item =inventory.find(item => item.name.toLowerCase() === productName.toLowerCase());
    console.log(item);
    item.quantity = quantity;
    console.log(item);
    await saveInventoryToFile(filePath, inventory);
    console.log("Inventory updated successfully." + "Remaining stock for " + item.name + ": " + item.quantity);
    
    } catch (err) {
        console.error("An error occurred while updating the inventory:", err);
    };
}

const calculateSubtotal = (unitPrice, discount, quantity) => {
    return unitPrice * quantity * (1 - discount / 100);
}

const createOrder = async (productName, quantity, filePath) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    };
    const listInventory = await loadInventoryFromFile(filePath);
    const product = listInventory.find(item => item.name.toLowerCase() === value.toLowerCase());
    const substraction = product.quantity - quantity;
    console.log(`Remaining stock for ${product.name}: ${substraction}`);
    if (substraction > 0) {
        await updateInventory(listInventory, value, substraction, filePath);
        const subtotal = calculateSubtotal(product.price, product.discount, quantity);
        console.log(`Order created for ${quantity} ${product.name}(s). Unit price: $${product.price}. Applied discount: ${product.discount}%. Total price: $${subtotal.toFixed(2)}`);
    } else {
        console.error(`Insufficient stock for ${product.name}. Available quantity: ${product.quantity}. Requested quantity: ${quantity}.`);
    };

    } catch (err) {
        console.error("An error occurred while creating the order:", err);
    };
};

export default createOrder;

//createOrder("Radio", 4, "../Reading-saving-data/inventory.txt");
