import { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory } from "./services/product-management.js";
import { resetInventoryFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

await showOneProduct("./data/inventory.json", "Pot");
//await showOneProduct("./data/inventory.json", "P");
//await showOneProduct("./data/inventory.json", -242);
//await showOneProduct("./data/inventory.json", "Desk");

//await listInventory("./data/inventory.json");

//await searchByCategory("./data/inventory.json", "Garden");
//await searchByCategory("./data/inventory.json", "Sofa");

//await addProduct("./data/inventory.json", { name: "Desk", category: "Furniture", price: 39.99, stockQuantity: 115 });
//await addProduct("./data/inventory.json", { name: "Desk", category: "Electronics", price: 9.99, stockQuantity: 14 });
//await addProduct("./data/inventory.json", { name: "Radio", category: "Electronics", price: -9.99, stockQuantity: -1 });

//await removeProduct("./data/inventory.json", "Desk");
//await removeProduct("./data/inventory.json", "Mouse");

//await createOrder("Pan", 1, "./data/inventory.json");
//await createOrder("Radio", -4, "./data/inventory.json");

//await resetInventoryFile("./data/inventory.json", "./data/inventory-backup.json");
