import Shops from "../database/models/Shops.js"

export const getShops = async (req, res, next) => {
  try {
    const response = await Shops.findAll()
    res.status(200).json({ code: "success", data: response })
  } catch (error) {
    res.status(400).json({ code: "error", error })
  }
}
