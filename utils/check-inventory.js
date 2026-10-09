import { readFile, writeFile } from "node:fs/promises";
import { Product } from "../models/Product.js";  

const saveInventoryToFile = async (filePath, inventory) => {
    try {
        const data = inventory.map(item =>
            item instanceof Product ? item.toJSON() : item
        );
        await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log("Data saved")
    } catch (err) {
        console.error("An error occurred while saving the inventory to file:", err);
    };
};

const loadInventoryFromFile = async (filePath) => {
    try {

        const rawData = await readFile(filePath, "utf8");
        const data = JSON.parse(rawData);
        return data.map(item => Product.fromJSON(item));
        
    } catch (err) {
        console.error("An error occurred while loading the inventory from file:", err);
        return [];
    };
};

const resetInventoryFile = async (filePath, initialInventory) => {
    try {
        const originalInventory = await readFile(initialInventory, "utf8");
        await writeFile(filePath, originalInventory, "utf8");
        console.log("Inventory file reset to its original state.");
    } catch (err) {
        console.error("An error occurred while resetting the inventory file:", err);
    }
}

export { saveInventoryToFile, loadInventoryFromFile, resetInventoryFile };