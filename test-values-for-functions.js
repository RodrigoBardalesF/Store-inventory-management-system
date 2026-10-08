import { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory } from "./services/product-management.js";
import { resetInventoryFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

//await showOneProduct("./data/inventory.txt", "Pot");
//await showOneProduct("./data/inventory.txt", "P");
//await showOneProduct("./data/inventory.txt", -242);
//await showOneProduct("./data/inventory.txt", "Desk");

//await listInventory("./data/inventory.txt");

//await searchByCategory("./data/inventory.txt", "Garden");
//await searchByCategory("./data/inventory.txt", "Sofa");

//await addProduct("./data/inventory.txt", { name: "Desk", category: "Furniture", price: 39.99, stockQuantity: 115 });
//await addProduct("./data/inventory.txt", { name: "Desk", category: "Electronics", price: 9.99, stockQuantity: 14 });
//await addProduct("./data/inventory.txt", { name: "Radio", category: "Electronics", price: -9.99, stockQuantity: -1 });

//await removeProduct("./data/inventory.txt", "Desk");
//await removeProduct("./data/inventory.txt", "Mouse");

//await createOrder("Pan", 1, "./data/inventory.txt");
//await createOrder("Radio", -4, "./data/inventory.txt");

//await resetInventoryFile("./data/inventory.txt", "./data/inventory-backup.txt");
