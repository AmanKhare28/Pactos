import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import Airtable from "airtable";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_PAT,
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000, () => console.log("app is listening on 3000"));
