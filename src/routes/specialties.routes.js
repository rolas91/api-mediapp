import express from "express";
const router = express.Router();

export default function () {
  router.get("/specialties", (req, res) => {
    res.status(200).json({
      code: "success",
      data: [],
    });
  });
  return router;
}
