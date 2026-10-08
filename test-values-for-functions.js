import { addProduct, removeProduct, searchByCategory, showOneProduct } from "./services/product-management.js";
import { loadInventoryFromFile, resetInventoryFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

//const product = await showOneProduct("./data/inventory.json", "Pot");
//console.log(product);
//await showOneProduct("./data/inventory.json", "P");
//await showOneProduct("./data/inventory.json", -242);
//await showOneProduct("./data/inventory.json", "Desk");

const inventory = await loadInventoryFromFile("./data/inventory.json");
console.log(inventory);

//const category = await searchByCategory("./data/inventory.json", "Garden");
//console.log(category);
//await searchByCategory("./data/inventory.json", "Sofa");

//const addedProduct = await addProduct("./data/inventory.json", { name: "Desk", category: "Furniture", price: 39.99, stockQuantity: 115 });
//console.log(addedProduct);
//await addProduct("./data/inventory.json", { name: "Desk", category: "Electronics", price: 9.99, stockQuantity: 14 });
//await addProduct("./data/inventory.json", { name: "Radio", category: "Electronics", price: -9.99, stockQuantity: -1 });

//await removeProduct("./data/inventory.json", "Desk");
//await removeProduct("./data/inventory.json", "Mouse");

//const order = await createOrder("Pan", 15, "./data/inventory.json");
//console.log(order);
//await createOrder("Radio", -4, "./data/inventory.json");

//await resetInventoryFile("./data/inventory.json", "./data/inventory-backup.json");
