import City from "./models/City.js"
import Country from "./models/Country.js"
import DoctorInfo from "./models/DoctorInfo.js"
import Profile from "./models/Profile.js"
import Specialties from "./models/Specialties.js"
import User from "./models/User.js"
import UserMedicalData from "./models/UserMedicalData.js"
import Shops from "./models/Shops.js"

export default function () {
  User.hasOne(DoctorInfo, {
    as: "isDoctor",
    foreignKey: "userId",
    onDelete: "cascade",
  })
  DoctorInfo.belongsTo(User, { onDelete: "cascade" })

  User.belongsTo(Country, { foreignKey: "countryId", onDelete: "cascade" })
  Country.hasMany(User, { foreignKey: "countryId" })

  User.belongsTo(City, { foreignKey: "cityId", onDelete: "cascade" })
  City.hasMany(User, { foreignKey: "cityId" })
}
