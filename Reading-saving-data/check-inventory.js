import { readFile } from "node:fs/promises";

const saveInventoryToFile = (inventory,filePath) => {

}

const loadInventoryFromFile = async (filePath) => {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
}

//const loadStock = await loadInventoryFromFile("./inventory.txt");
//console.log(loadStock);

export { saveInventoryToFile, loadInventoryFromFile };