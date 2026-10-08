import { saveInventoryToFile, loadInventoryFromFile } from "../utils/check-inventory.js";
import { validateNewProduct, validateProductName } from "../models/product.schema.js";

const addProduct = async (filePath, product) => { 
    try {

    const {error, value} = validateNewProduct(product);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = await loadInventoryFromFile(filePath);
    if (fullInventory.find(item => item.name === value.name)) {
        console.error(`Product with name "${value.name}" already exists in the inventory.`);
        return;
    }
    const addedItemList = [...fullInventory, value];
    await saveInventoryToFile(filePath, addedItemList);
    console.log("Item added successfully.");
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

const removeProduct = async (filePath, productName) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = await loadInventoryFromFile(filePath);
    if (!fullInventory.find(item => item.name.toLowerCase() === value.toLowerCase())) {
        console.error(`Product with name "${productName}" does not exist in the inventory.`);
        return;
    }
    const removeProductList = fullInventory.filter(item => item.name.toLowerCase() !== value.toLowerCase());
    //console.log(removeProductList);
    await saveInventoryToFile(filePath,removeProductList);
    console.log("Item deleted successfully.");
    } catch (err) {
        console.error("An error occurred while removing the product:", err);
    };
};

const searchByCategory = async (filePath, category) => {
    try {

    const {error, value} = validateProductName(category);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = await loadInventoryFromFile(filePath);
     if (!fullInventory.find(item => item.category.toLowerCase() === value.toLowerCase())) {
        console.error(`Category with name "${value}" does not exist in the inventory.`);
        return;
    };
    const products = fullInventory.filter(item => item.category.toLowerCase() === value.toLowerCase());
    return products;

    } catch (err) {
    console.error("An error occurred while searching by category:", err);
    };
};

const showOneProduct = async (filePath, productName) => {
    try {

    const {error, value} = validateProductName(productName);
    if (error) {
        console.error(error.details);
        return;
    }
    const fullInventory = await loadInventoryFromFile(filePath);
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


export { addProduct, removeProduct, searchByCategory, showOneProduct };
