import express from "express";
const router = express.Router();

export default function () {
  router.get("/specialties", (req, res) => {
    res.status(200).json({
      code: "success",
      data: [
        {
          id: 1,
          name: "Medicina Interna",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 2,
          name: "Ginecologia",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 3,
          name: "Cirugia",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 4,
          name: "Ortopedia",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 5,
          name: "Medicina General",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 6,
          name: "Psicólogos",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 7,
          name: "Odontologos",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 8,
          name: "Urologia",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 9,
          name: "Anestesiología",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 10,
          name: "Dermatología",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 11,
          name: "Oftalmología",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 12,
          name: "Fisiatria",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 13,
          name: "Radiologia",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 14,
          name: "Otorrinolaringología",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 16,
          name: "Patología",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 17,
          name: "Oncología Clínica",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 18,
          name: "Cirugía Oncologica",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
        {
          id: 19,
          name: "Veterinarios",
          image: `${process.env.URL}/static/images/medicinainterna.jpg`,
        },
      ],
    });
  });
  return router;
}
