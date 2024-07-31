const express = require("express");
const regionSchema = require("../models/region");

const router = express.Router();

// create region
router.post("/regions", (req, res) => {
  const region = regionSchema(req.body);
  region
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all regions
router.get("/regions", (req, res) => {
  regionSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a region
router.get("/regions/:id", (req, res) => {
  const { id } = req.params;
  regionSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a region
router.delete("/regions/:id", (req, res) => {
  const { id } = req.params;
  regionSchema
    .deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount === 0) {
        return res.status(404).json({ message: 'Region not found' });
      }
      res.json({ message: 'Region deleted successfully' });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// update a region
router.put("/regions/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  regionSchema
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
