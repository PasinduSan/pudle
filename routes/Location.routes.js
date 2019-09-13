const express = require("express");
const router = express.Router();
const Location = require("../models/location.model");

router.post("/location", async (req, res, next) => {
  try {
    const { type, coordinates } = req.body;
    const location = new Location({
      locationType: type,
      loc: {
        coordinates
      }
    });
    await location.save();
    return res.json(location);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/location", async (req, res, next) => {
  try {
    const { type, createdAt, pageNumber } = req.query;
    const locations = await Location.getLocations({
      type,
      createdAt,
      pageNumber
    });
    return res.json(locations);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/map", async (req, res, next) => {
  try {
    const { lat, long, type } = req.query;
    const locations = await Location.getNearByLocations({ lat, long, type });
    return res.json(locations);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
