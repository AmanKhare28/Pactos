import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID
);

const productsTable = "Products";

export const getProducts = async (req, res) => {
  try {
    const records = await base(productsTable).select().all();
    const products = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await base(productsTable).find(id);
    if (record) {
      res.json({ id: record.id, ...record.fields });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const getProductsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const records = await base(productsTable)
      .select({
        filterByFormula: `{email} = '${email}'`,
      })
      .all();

    const products = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    res.json(products);
  } catch (error) {
    console.error(`Error fetching products for email ${email}:`, error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, imageurl, email } = req.body;
  try {
    const createdRecord = await base(productsTable).create({
      name,
      description,
      price,
      email,
      imageurl,
    });
    res
      .status(201)
      .json({ id: createdRecord.id, fields: createdRecord.fields });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageURL } = req.body;
  try {
    const updatedRecord = await base(productsTable).update(id, {
      name,
      description,
      price,
      imageURL,
    });
    res.json({ id: updatedRecord.id, fields: updatedRecord.fields });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await base(productsTable).destroy(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
