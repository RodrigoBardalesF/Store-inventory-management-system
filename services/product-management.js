import { saveInventoryToFile, loadInventoryFromFile } from "../utils/check-inventory.js";
import { validateNewProduct, validateProductName } from "../models/product.schema.js";

class StoreInventory {
    constructor(filePath) {
        this.inventory = [];
        this.path = filePath;
    }
    
    addProduct(product) { 
    try {

    const {error, value} = validateNewProduct(product);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = this.inventory;
    if (fullInventory.find(item => item.name === value.name)) {
        console.error(`Product with name "${value.name}" already exists in the inventory.`);
        return;
    }
    this.inventory.push(value);
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

    removeProduct = async (productName) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = this.inventory;
    if (!fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase())) {
        console.error(`Product with name "${productName}" does not exist in the inventory.`);
        return;
    }
    this.inventory = this.inventory.filter(item => item.name.toLowerCase() !== value.toLowerCase());
    console.log("Item deleted successfully.");
    } catch (err) {
        console.error("An error occurred while removing the product:", err);
    };
    };

    searchByCategory(category) {
    try {

    const {error, value} = validateProductName(category);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = this.inventory;
     if (!fullInventory.find(item => item.category.toLowerCase() === value.toLowerCase())) {
        console.error(`Category with name "${value}" does not exist in the inventory.`);
        return;
    };
    const products = fullInventory.filter(item => item.category.toLowerCase() === value.toLowerCase());
    console.log(JSON.stringify(products, null, 2));
    return products;

    } catch (err) {
    console.error("An error occurred while searching by category:", err);
    };
    };

    showOneProduct(productName) {
    try {

        const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
        const fullInventory = this.inventory;
    if (!fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase())) {
        console.error(`Product with name "${value}" does not exist in the inventory.`);
        return;
    }
    const product = fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase());
    console.log(product.name + " (" + product.category + ") - $" + product.price + " | Stock: " + product.stockQuantity);
    return product;
    
    } catch (err) {
    console.error("An error occurred while showing the product:", err);
    };
    };

    load = async () => {
        this.inventory = await loadInventoryFromFile(this.path);
        console.log("Inventory loaded successfully from file.");
        console.log(JSON.stringify(this.inventory, null, 2));
        return this.inventory;
    };
    
    save = async () => {
        await saveInventoryToFile(this.path, this.inventory);
    };

    showInventory = () => {
        console.log(JSON.stringify(this.inventory, null, 2));
        return this.inventory;
    };

};

export { StoreInventory };