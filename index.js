const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Enable cors
app.use(cors());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Set static folder
app.use(express.static("public"));

// Routs
app.use("/api", require("./routes/index"));
