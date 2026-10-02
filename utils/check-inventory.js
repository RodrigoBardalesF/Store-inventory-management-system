import { readFile, writeFile } from "node:fs/promises";

const saveInventoryToFile = async (filePath, inventory) => {
    try {
        await writeFile(filePath, JSON.stringify(inventory), "utf8");
    } catch (err) {
        console.error("An error occurred while saving the inventory to file:", err);
    };
};

const loadInventoryFromFile = async (filePath) => {
    try {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
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