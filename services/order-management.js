import { validateProductName, validateInputQuantity } from "../models/product.schema.js";

class MakeOrder {
    constructor(store) {
        this.currentInventory = store;
    }
    
    printStoreInventory() {
        const inventory = this.currentInventory.inventory;
        console.log("Current Store Inventory:");
        console.log(JSON.stringify(inventory, null, 2));
    };

    updateInventory = async (product, quantity) => {
    try {

    product.stockQuantity = quantity;
    console.log("Inventory updated successfully." + "Remaining stock for " + product.name + ": " + product.stockQuantity);
    
    } catch (err) {
        console.error("An error occurred while updating the inventory:", err);
    };
    };

    calculateSubtotal (unitPrice, quantity) {
    const subtotal = unitPrice * quantity;
    if (subtotal >= 500) {
        const discountedAmount = subtotal * (0.15)
        return {
            subtotal:subtotal,
            discountedAmount: discountedAmount,
            discountRate:15,
            total: subtotal - discountedAmount
        };
    }
    else if (subtotal >= 200) {
                const discountedAmount = subtotal * (0.10)
        return {
            subtotal:subtotal,
            discountedAmount: discountedAmount,
            discountRate:10,
            total: subtotal - discountedAmount
        };
    }
    else if (subtotal >= 100) {
                const discountedAmount = subtotal * (0.05)
        return {
            subtotal:subtotal,
            discountedAmount: discountedAmount,
            discountRate:5,
            total: subtotal - discountedAmount
        };
    }
    else {
        return {
            subtotal: subtotal,
            discountedAmount: 0,
            discountRate:0,
            total: subtotal
        };
    }
    }

    createOrder = async (productName, quantity) => {
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
    };

    const product = this.currentInventory.showOneProduct(value);
    const substraction = product.stockQuantity - quantityValue;
    console.log(`Remaining stock for ${product.name}: ${substraction}`);
    if (substraction >= 0) {
        await this.updateInventory(product, substraction);
        const subtotal = this.calculateSubtotal(product.price, quantityValue);
        return ({
            productName: product.name,
            orderedQuantity: quantityValue,
            unitPrice: product.price,
            finalTotal: subtotal.total,
            appliedDiscountRate: subtotal.discountRate,
            discountedAmount: subtotal.discountedAmount
        })
    } else {
        console.error(`Insufficient stock for ${product.name}. Available quantity: ${product.stockQuantity}. Requested quantity: ${quantity}.`);
    };

    } catch (err) {
        console.error("An error occurred while creating the order:", err);
    };
  };
   
};

export  { MakeOrder };

