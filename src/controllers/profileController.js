import Profile from "../models/Profile.js";

export const getProfiles = async (req, res, next) => {
  try {
    const result = await Profile.findAll();
    res.status(200).json({ code: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: "error", data: [] });
  }
};
