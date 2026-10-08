import { addProduct, removeProduct, searchByCategory, showOneProduct, listInventory } from "./services/product-management.js";
import { resetInventoryFile } from "./utils/check-inventory.js";
import createOrder from "./services/order-management.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const logStep = async (message) => {
    console.log("\n" + "-".repeat(60));
    console.log(`  ${message}`);
    console.log("-".repeat(60));
};

const AcceptancePath = async () => {
    // 1. Show the current inventory
    await logStep("Welcome to the Store Inventory and Management System!");
    await logStep("Showing the current inventory:");
    await listInventory("./data/inventory.json");

    // 2. Show the details of a specific product and category
    await logStep("Choosing and showing one product: Radio")
    await showOneProduct("./data/inventory.json", "Radio");
    await logStep("Choosing and showing one category: Electronics")
    await searchByCategory("./data/inventory.json", "Electronics");

    // 3. Add a new product and then delete it
    await logStep("Adding a product: Flashlight")
    await addProduct("./data/inventory.json", { name: "Flashlight", category: "Electronics", price: 9.99, stockQuantity: 15 });
    await showOneProduct("./data/inventory.json", "Flashlight");
    await logStep("Deleting the product: Flashlight")
    await removeProduct("./data/inventory.json", "Flashlight");
    await listInventory("./data/inventory.json");

    // 4. Create an order for a product and creating an order with insufficient stock
    await logStep("Creating an order for 4 Radios")
    await createOrder("Radio", 4, "./data/inventory.json");
    await logStep("Creating an order for 20 Fans")
    await createOrder("Fan", 20, "./data/inventory.json");


    // 5. Edge cases
    await logStep("EDGE CASES");
    await logStep("Case 1: Short product name: R");
    await showOneProduct("./data/inventory.json", "R");
    await logStep("Case 2: Non-existent product: TV");
    await showOneProduct("./data/inventory.json", "TV");
    await logStep("Case 3: Non-existent category: Bedroom");
    await searchByCategory("./data/inventory.json", "Bedroom");
    await logStep("Case 4: Adding a product with negative price and stock quantity: Radio");
    await addProduct("./data/inventory.json", { name: "Radio", category: "Electronics", price: -9.99, stockQuantity: -1 });
    await logStep("Case 5: Creating an order with negative quantity for Radio");
    await createOrder("Radio", -4, "./data/inventory.json");

    // 6. Reset the inventory file to its original state
    await logStep("Resetting the inventory file to its original state.");
    await resetInventoryFile("./data/inventory.json", "./data/inventory-backup.json");
}

await AcceptancePath();

