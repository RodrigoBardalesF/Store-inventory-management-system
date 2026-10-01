import { saveInventoryToFile, loadInventoryFromFile } from "../Reading-saving-data/check-inventory.js";

const addProduct = async (filePath, product) => { 
    const fullInventory = await loadInventoryFromFile(filePath);
    const addedItemList = [...fullInventory, product];
    await saveInventoryToFile(addedItemList, filePath);
};

const removeProduct = async (filePath, productName) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const removeProductList = fullInventory.filter(item => item.name.toLowerCase() !== productName.toLowerCase());
    console.log(removeProductList);
    await saveInventoryToFile(removeProductList, filePath);
    console.log("Item deleted successfully.");
};

const searchByCategory = async (filePath, category) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const products = fullInventory.filter(item => item.category.toLowerCase() === category.toLowerCase());
    console.log(products);
};

const showOneProduct = async (filePath, productName) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const product = fullInventory.find(item => item.name.toLowerCase() === productName.toLowerCase());
    console.log(product.name + " (" + product.category + ") - $" + product.price + " | Stock: " + product.quantity);
};

const listInventory = async (filePath) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    console.log(fullInventory);

};

export { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory };

//listInventory("../Reading-saving-data/inventory.txt");
//await showOneProduct("../Reading-saving-data/inventory.txt", "Radio");
searchByCategory("../Reading-saving-data/inventory.txt", "Electronics");
//removeProduct("../Reading-saving-data/inventory.txt", "Radio");
//addProduct("../Reading-saving-data/inventory.txt", { name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });