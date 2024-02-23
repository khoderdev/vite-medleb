// Import required modules
import express, { json } from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

// Initialize Express app
const app = express();
app.use(json());
app.use(cors());

// Define Sequelize connection
const sequelize = new Sequelize({
  dialect: "mssql",
  host: "localhost",
  database: "MedLeb_Tables",
  username: "sa",
  password: "1234",
});

// Define Sequelize model for your table
const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  OrderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness
  },
  drugName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestedQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending", // Set default value
  },
});

// Middleware function for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Define routes for CRUD operations

// Create operation
app.post("/orders", async (req, res) => {
  try {
    // Generate unique 4-digit serial number for OrderId
    const OrderId = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

    // Include OrderId in the request body
    const orderData = { ...req.body, OrderId };

    console.log("Create Order Request:", orderData);
    const order = await Order.create(orderData);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ error: error.message });
  }
});

// Read operation
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(400).json({ error: error.message });
  }
});

// Update operation
app.put("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(400).json({ error: error.message });
  }
});

// Delete operation
app.delete("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(400).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
