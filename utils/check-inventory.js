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

export { saveInventoryToFile, loadInventoryFromFile };