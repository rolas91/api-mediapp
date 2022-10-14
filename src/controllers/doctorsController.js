import User from "../models/User.js";
import DoctorInfo from "../models/DoctorInfo.js";

export const getDoctors = async () => {
  try {
    const userDoctor = User.findAll({
      include: [{ model: DoctorInfo, required: false }],
    });
    console.log(userDoctor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: "error", error });
  }
};
