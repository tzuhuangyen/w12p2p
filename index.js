const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// Use middleware to parse the request body as JSON
app.use(express.json());

const dbFilePath = path.join(__dirname, "db.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Handle listing pets
app.get("/carts", (req, res) => {
  try {
    // Read pet data from db.json
    const rawData = fs.readFileSync(dbFilePath);
    const pets = JSON.parse(rawData);

    // Return the list of pets as a response
    res.json(pets);
  } catch (error) {
    console.error("Error reading pet data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
