import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID
);

export const createOrder = async (req, res) => {
  const { productid, buyername, buyeremail, buyeraddress } = req.body;

  // Validate required fields
  if (!productid || !buyername || !buyeremail || !buyeraddress) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const createdRecord = await base("Orders").create({
      productid,
      buyername,
      buyeremail,
      buyeraddress,
    });
    res.status(201).json({ id: createdRecord.id, ...createdRecord.fields });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrdersByEmail = async (req, res) => {
  const { buyeremail } = req.query;
  if (!buyeremail) {
    return res.status(400).json({ error: "buyerEmail parameter is required" });
  }

  try {
    const formula = `({buyerEmail} = '${buyeremail}')`;
    const records = await base("orders")
      .select({ filterByFormula: formula })
      .all();

    const orders = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
