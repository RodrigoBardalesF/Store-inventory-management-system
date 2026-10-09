import { saveInventoryToFile, loadInventoryFromFile } from "../utils/check-inventory.js";
import { validateNewProduct, validateProductName } from "../models/product.schema.js";

const createInventory = (filePath) => {

    let inventory = [];
    const path = filePath;

    const addProduct = (product) => { 
    try {

    const {error, value} = validateNewProduct(product);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = inventory;
    if (fullInventory.find(item => item.name === value.name)) {
        console.error(`Product with name "${value.name}" already exists in the inventory.`);
        return;
    }
    inventory.push(value);
    console.log("Item added successfully. ");
    console.log(value);
    return({
        name: value.name,
        category: value.category,
        price: value.price,
        stockQuantity: value.stockQuantity,
        discount: value.discount
    })
    } catch (err) {
        console.error("An error occurred while adding the product:", err);
    };
    };

    const removeProduct = async (productName) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = inventory;
    if (!fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase())) {
        console.error(`Product with name "${productName}" does not exist in the inventory.`);
        return;
    }
    inventory = inventory.filter(item => item.name.toLowerCase() !== value.toLowerCase());
    console.log("Item deleted successfully.");
    } catch (err) {
        console.error("An error occurred while removing the product:", err);
    };
    };

    const searchByCategory = (category) => {
    try {

    const {error, value} = validateProductName(category);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = inventory;
     if (!fullInventory.find(item => item.category.toLowerCase() === value.toLowerCase())) {
        console.error(`Category with name "${value}" does not exist in the inventory.`);
        return;
    };
    const products = fullInventory.filter(item => item.category.toLowerCase() === value.toLowerCase());
    console.log(products);
    return products;

    } catch (err) {
    console.error("An error occurred while searching by category:", err);
    };
    };

    const showOneProduct = (productName) => {
    try {

        const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
        const fullInventory = inventory;
    if (!fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase())) {
        console.error(`Product with name "${value}" does not exist in the inventory.`);
        return;
    }
        const product = fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase());
    console.log(product.name + " (" + product.category + ") - $" + product.price + " | Stock: " + product.quantity);
    return product;
    
    } catch (err) {
    console.error("An error occurred while showing the product:", err);
    };
    };

    const load = async () => {
        inventory = await loadInventoryFromFile(path);
        console.log("Inventory loaded successfully from file.");
        console.log(inventory);
        return inventory;
    };
    
    const save = async () => {
        await saveInventoryToFile(path, inventory);
    };

    const showInventory = () => {
        console.log(inventory);
        return inventory;
    };

    return {
        addProduct,
        removeProduct,
        searchByCategory,
        showOneProduct,
        save,
        load,
        showInventory
    }
};
export { createInventory };
