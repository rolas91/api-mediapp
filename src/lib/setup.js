import Specialties from "../models/Specialties.js";
import Countries from "../models/Country.js";
import Shops from "../models/Shops.js";
import Profile from "../models/Profile.js";
import Cities from "../models/City.js";
import SpecialtiesData from "../utils/specialties.js";
import CountriesData from "../utils/countries.js";
import ShopsData from "../utils/shops.js";
import ProfileData from "../utils/profile.js";
import CitiesData from "../utils/cities.js";

export const addProfileCode = async () => {
  try {
    ProfileData.forEach(async (data) => {
      await Profile.create({
        code: data.code,
        name: data.name,
        description: data.description,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

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
      const country_added = await Countries.create({
        country: data.country,
        code: data.code,
        iso: data.iso,
      });
      CitiesData.forEach(async (data) => {
        if (country_added.country === data.country) {
          await Cities.create({
            city: data.city,
            countryId: country_added.id,
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addShops = () => {
  try {
    ShopsData.forEach(async (data) => {
      await Shops.create({
        name: data.name,
        image: data.image,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
