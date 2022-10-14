import Specialties from "../database/models/Specialties.js"

export const getSpecialties = async (req, res, next) => {
  try {
    const result = await Specialties.findAll()
    res.status(200).json({ code: "success", data: result })
  } catch (error) {
    console.log(error)
  }
}
