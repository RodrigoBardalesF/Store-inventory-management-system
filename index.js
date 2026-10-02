import { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory } from "./services/product-management.js";
import { saveInventoryToFile, loadInventoryFromFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AcceptancePath = async () => {
    console.log("--------------------------------");
    console.log("Welcome to the Store Inventory and Management System!");
    console.log("Showing the current inventory:");
    console.log("--------------------------------");
    await listInventory("./data/inventory.txt");
    await sleep(3000)
    console.log("Choosing and showing one product: Radio")
    console.log("--------------------------------");
    await showOneProduct("./data/inventory.txt", "Radio");
    await sleep(3000)
    console.log("Choosing and showing one category: Electronics")
    console.log("--------------------------------");
    await searchByCategory("./data/inventory.txt", "Electronics");
    await sleep(3000)
    console.log("Adding a product: Flashlight")
    console.log("--------------------------------");
    await addProduct("./data/inventory.txt", { name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });
    console.log("--------------------------------");
    await sleep(3000)
    console.log("Deleting the product: Flashlight")
    console.log("--------------------------------");
    await removeProduct("./data/inventory.txt", "Flashlight");
    console.log("--------------------------------");
    await sleep(3000)
    console.log("Creating an order for 4 Radios")
    console.log("--------------------------------");
    await createOrder("Radio", 4, "./data/inventory.txt");
}

await AcceptancePath();

//await showOneProduct("./data/inventory.txt", "Radio");
//await listInventory("./data/inventory.txt");
//await searchByCategory("./data/inventory.txt", "Electronics");
//await addProduct("./data/inventory.txt", { name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });
//await removeProduct("./data/inventory.txt", "Flashlight");
//await createOrder("Radio", 4, "./data/inventory.txt");
