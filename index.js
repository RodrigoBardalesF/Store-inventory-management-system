import { resetInventoryFile } from "./utils/check-inventory.js";
import { MakeOrder } from "./services/order-management.js";
import { StoreInventory } from './services/product-management.js';


const newInventory = new StoreInventory("./data/inventory.json");

//Loading the inventory from the file

await newInventory.load();

//CRUD operations on the inventory

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

//Creating an order and updating the inventory

const order = new MakeOrder(newInventory);
order.printStoreInventory();
const order1 = await order.createOrder("Radio", 4);
console.log(order1)
const order2 = await order.createOrder("Pan", 10);
console.log(order2)
await newInventory.save();

//Edge cases for CRUD operations and order creation
newInventory.showOneProduct("R");
newInventory.searchByCategory("4");
newInventory.addProduct({ name: "Flashlight", category: "Electronics", stockQuantity: 15 });
newInventory.removeProduct("Socks");


//Restoring the inventory to its original state
await resetInventoryFile("./data/inventory.json", "./data/inventory-backup.json");


