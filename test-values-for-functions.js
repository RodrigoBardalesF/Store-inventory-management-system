import { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory } from "./services/product-management.js";
import { resetInventoryFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

//await showOneProduct("./data/inventory.txt", "Radio");
//await showOneProduct("./data/inventory.txt", "R");
//await showOneProduct("./data/inventory.txt", 2);
//await showOneProduct("./data/inventory.txt", "TV");

//await listInventory("./data/inventory.txt");

//await searchByCategory("./data/inventory.txt", "Electronics");
//await searchByCategory("./data/inventory.txt", "Bedroom");

//await addProduct("./data/inventory.txt", { name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });
//await addProduct("./data/inventory.txt", { name: "Radio", category: "Electronics", price: 9.99, stockQuantity: 14 });
//await addProduct("./data/inventory.txt", { name: "Radio", category: "Electronics", price: -9.99, stockQuantity: -1 });

//await removeProduct("./data/inventory.txt", "Flashlight");
//await removeProduct("./data/inventory.txt", "TV");

//await createOrder("Radio", 4, "./data/inventory.txt");
//await createOrder("Radio", -4, "./data/inventory.txt");

await resetInventoryFile("./data/inventory.txt", "./data/inventory-backup.txt");
