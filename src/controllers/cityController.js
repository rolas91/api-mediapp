import City from "../models/City.js";

export const getCities = async (req, res, next) => {
  try {
    const response = await City.findAll({
      where: { countryId: req.query.country_id },
    });
    res.status(200).json({ code: "success", cities: response });
  } catch (error) {
    res.status(400).json({ code: "error", error });
  }
};

export const createCity = async (req, res, next) => {
  try {
    const { city, countryId } = req.body;
    const result = await City.create({
      city,
      countryId,
    });
    if (result) {
      res.status(200).json({ code: "success", message: "register success" });
    }
  } catch (error) {
    res.status(400).json({ code: "error", error });
  }
};
