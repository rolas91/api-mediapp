import Specialties from "../models/Specialties.js";
import Countries from "../models/Country.js";
import SpecialtiesData from "../utils/specialties.js";
import CountriesData from "../utils/countries.js";

export const addSpecialties = () => {
  try {
    SpecialtiesData.forEach(async (data) => {
      await Specialties.create({
        id: data.id,
        name: data.name,
        image: data.image,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCountries = () => {
  try {
    CountriesData.forEach(async (data) => {
      await Countries.create({
        country: data.country,
        code: data.code,
        iso: data.iso,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
