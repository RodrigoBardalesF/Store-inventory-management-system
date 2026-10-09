import { validateNewProduct } from "./product.schema.js";

class Product {
    #name;
    #category;
    #price;
    #stockQuantity;
    #discount;

    constructor(name, category, price, stockQuantity, discount = 0) {
        const { error, value } = validateNewProduct({
            name,
            category,
            price,
            stockQuantity,
            discount,
        });

        if (error) {
            throw new Error(`Invalid product: ${error.details.map(d => d.message).join(", ")}`);
        }

        this.#name = value.name;
        this.#category = value.category;
        this.#price = value.price;
        this.#stockQuantity = value.stockQuantity;
        this.#discount = value.discount ?? 0;
    }

    get name() { return this.#name; }
    get category() { return this.#category; }
    get price() { return this.#price; }
    get stockQuantity() { return this.#stockQuantity; }
    get discount() { return this.#discount; }

    set price(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Price must be a positive number.");
        }
        this.#price = value;
    }

    set stockQuantity(value) {
        if (typeof value !== "number" || value < 0) {
            throw new Error("Stock cannot be negative.");
        }
        this.#stockQuantity = value;
    }

    set name(value) {
        if (typeof value !== "string" || value.trim().length < 2) {
            throw new Error("Name must be at least 2 characters.");
        }
        this.#name = value.trim();
    }

    set category(value) {
        if (typeof value !== "string" || value.trim().length < 2) {
            throw new Error("Category must be at least 2 characters.");
        }
        this.#category = value.trim();
    }

    set discount(value) {
        if (typeof value !== "number" || value <= 0 || value > 100) {
            throw new Error("Discount must be between 0 and 100.");
        }
        this.#discount = value;
    }

    isInStock(quantity = 1) {
        return this.#stockQuantity >= quantity;
    }

    reduceStock(quantity) {
        if (quantity <= 0) throw new Error("Quantity must be positive.");
        if (this.#stockQuantity < quantity) {
            throw new Error(`Insufficient stock. Available: ${this.#stockQuantity}, Requested: ${quantity}`);
        }
        this.#stockQuantity -= quantity;
        return this.#stockQuantity;
    }

    toJSON() {
        return {
            name: this.#name,
            category: this.#category,
            price: this.#price,
            stockQuantity: this.#stockQuantity,
            discount: this.#discount,
        };
    }

    static fromJSON(data) {
        return new Product(
            data.name,
            data.category,
            data.price,
            data.stockQuantity,
            data.discount ?? 0
        );
    }
}

export { Product };