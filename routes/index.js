const express = require("express");
const router = express.Router();
const needle = require("needle");
const url = require("url");

// Env var
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const options = {
  headers: {
    [API_KEY_NAME]: API_KEY_VALUE,
    "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
  },
};

// Create route
router.get("/", async (req, res) => {
  try {
    const queryParmsRaw = {
      ...url.parse(req.url, true).query,
    };
    const category = queryParmsRaw.category;
    console.log("req.url", req.url);
    console.log("query Raw", queryParmsRaw);
    delete queryParmsRaw.category;
    const queryParmsReady = new URLSearchParams({
      ...queryParmsRaw,
    });

    console.log("query Ready", queryParmsReady);

    console.log(
      "get request",
      `${API_BASE_URL}/${category}?${queryParmsReady}`
    );

    const apiRes = await needle(
      "get",
      `${API_BASE_URL}/${category}?${queryParmsReady}`,
      options
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
