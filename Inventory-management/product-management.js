import { saveInventoryToFile, loadInventoryFromFile } from "../Reading-saving-data/check-inventory.js";


const addProduct = (product) => {

};

const removeProduct = async (filePath, productName) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const removeProduct = fullInventory.filter(item => item.name !== productName);
    console.log(removeProduct);
};

const searchByCategory = async (filePath, category) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const products = fullInventory.filter(item => item.category === category);
    console.log(products);
};

const showOneProduct = async (filePath, productName) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    const product = fullInventory.find(item => item.name === productName);
    console.log(product);
};

const listInventory = async (filePath) => {
    const fullInventory = await loadInventoryFromFile(filePath);
    console.log(fullInventory);

};

//listInventory("../Reading-saving-data/inventory.txt");
//showOneProduct("../Reading-saving-data/inventory.txt", "Radio");
//searchByCategory("../Reading-saving-data/inventory.txt", "Electronics");
removeProduct("../Reading-saving-data/inventory.txt", "Radio");