import express from "express"
const router = express.Router()
import { check } from "express-validator"

import {
  authenticateUser,
  registerUser,
  registerDoctor,
} from "../controllers/authController.js"

export default function () {
  router.post(
    "/auth/register",
    [
      check("names", "Los nombres son obligatorios"),
      check("email", "El correo es obligatorio"),
      check("password", "La contraseña es obligatoria"),
      check("phone", "El número de teléfono es obligatorio"),
      check("birthday", "La fecha de su cumpleaños es obligatoria"),
      check("id_number", "Su cédula es obligatoria"),
      check("blood_type", "Su tipo de sangre es obligatorio"),
      check("weight", "Debe agregar su peso corporal"),
      check("height", "Debe agregar su altura"),
      check("age", "Diganos su edad"),
      check("country_id", "Seleccione el país en el que reside"),
      check("city_id", "Seleccione la ciudad en la que se encuentra"),
    ],
    registerUser
  )
  router.post(
    "/auth/doctor/register",
    [
      check("names", "Los nombres son obligatorios"),
      check("email", "El correo es obligatorio"),
      check("password", "La contraseña es obligatoria"),
      check("phone", "El número de teléfono es obligatorio"),
      check("birthday", "La fecha de su cumpleaños es obligatoria"),
      check("id_number", "Su cédula es obligatoria"),
      check("health_code", "Agrege su código sanitario"),
      check("specialty_id", "Seleccione su especialidad"),
      check("country_id", "Seleccione el país en el que reside"),
      check("city_id", "Seleccione la ciudad en la que se encuentra"),
    ],
    registerDoctor
  )
  router.post("/auth/login", [], authenticateUser)

  return router
}
