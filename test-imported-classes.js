import { createInventory } from './services/product-management.js';
import { makeOrder } from './services/order-management.js';
import { resetInventoryFile } from "./utils/check-inventory.js";


const main = async () => {

    const newInventory = createInventory("./data/inventory.json");

    const newOrder = makeOrder(newInventory.showInventory());
    await newOrder.createOrder("Radio", 4);

    await newInventory.load("./data/inventory.json");
    newInventory.showOneProduct("Radio");
    newInventory.searchByCategory("Electronics");
    newInventory.addProduct({ name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });
    newInventory.showInventory();
    newInventory.removeProduct("Flashlight");
    newInventory.showInventory();
    newInventory.addProduct({ name: "Desk", category: "Furniture", price: 9.99, stockQuantity: 15 });
    newInventory.addProduct({ name: "Chair", category: "Furniture", price: 9.99, stockQuantity: 15 });
    await newInventory.save();
    await newInventory.load();
    resetInventoryFile("./data/inventory.json", "./data/inventory-backup.json");
}

main();
