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
    // // Getting from endpoint necessary information to build url for API Request
    // const queryParmsRaw = {
    //   ...url.parse(req.url, true).query,
    // };
    // const category = queryParmsRaw.category;
    // delete queryParmsRaw.category;
    // let queryParmsReady = new URLSearchParams({
    //   ...queryParmsRaw,
    // });
    // // Use date endpoint of number API which is different from other categories
    // if (category === "date") {
    //   const month = queryParmsRaw.min;
    //   const day = queryParmsRaw.max;
    //   delete queryParmsRaw.min;
    //   delete queryParmsRaw.max;
    //   queryParmsReady = new URLSearchParams({
    //     ...queryParmsRaw,
    //   });
    //   const apiRes = await needle(
    //     "get",
    //     `https://numbersapi.p.rapidapi.com/${month}/${day}/${category}?${queryParmsReady}`,
    //     options
    //   );
    //   const data = apiRes.body;

    //   res.status(200).json(data);
    // } else {
    //   // Use different endpoint
    //   const apiRes = await needle(
    //     "get",
    //     `${API_BASE_URL}/${category}?${queryParmsReady}`,
    //     options
    //   );
    //   const data = apiRes.body;

    //   res.status(200).json(data);}
    // const apiRes = await needle(
    //   "get",
    //   `${API_BASE_URL}/trivia?min=42&max=42&fragment=true&json=true&category=math`,
    //   options
    // );
    // const data = apiRes.body;
    // console.log(data);
    // res.json(data);
    res.json(
      `${API_BASE_URL}/trivia?min=42&max=42&fragment=true&json=true&category=math`
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

router.get("/test", (req, res) => {
  res
    .status(200)
    .json({ env1: process.env.API_BASE_URL, env2: process.env.API_KEY_NAME });
});
