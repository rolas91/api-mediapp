import Country from "../database/models/Country.js"

export const getCountries = async (req, res, next) => {
  try {
    const response = await Country.findAll()
    res.status(200).json({ code: "success", countries: response })
  } catch (error) {
    res.status(400).json({ code: "error", error })
  }
}

export const createCountry = async (req, res, next) => {
  try {
    const { country, code, iso } = req.body
    const result = await Country.create({
      country,
      code,
      iso,
    })
    if (result) {
      res.status(200).json({ code: "success", message: "register success" })
    }
  } catch (error) {
    res.status(400).json({ code: "error", error })
  }
}
