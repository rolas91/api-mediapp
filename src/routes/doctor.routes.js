import express from "express";
const router = express.Router();
import { getDoctors } from "../controllers/doctorsController.js";
export default function () {
  router.get("/doctors", getDoctors);

  router.get("/search/doctors/:specialty_id", (req, res) => {
    const data = [
      {
        id: 1,
        name: "Fidel Guzman Sevilla",
        specialities_id: [1, 2, 3],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/doctors/1.jpg`,
      },
      {
        id: 2,
        name: "Rolando Sanchez",
        specialities_id: [4, 2, 5],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/doctors/2.jpg`,
      },
      {
        id: 3,
        name: "Roberto Gonzales",
        specialities_id: [8, 7, 6],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/doctors/3.jpg`,
      },
      {
        id: 4,
        name: "Miguel Mezza",
        specialities_id: [8, 9, 10],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/doctors/4.jpg`,
      },
      {
        id: 5,
        name: "Alejandro Sanchez",
        specialities_id: [11, 12, 15],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/doctors/5.jpg`,
      },
      {
        id: 6,
        name: "Mario Mejia",
        specialities_id: [16, 17, 18],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/centers/6.jpg`,
      },
      {
        id: 7,
        name: "Orlando Mezza",
        specialities_id: [12, 13, 19],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/centers/7.jpg`,
      },
      {
        id: 8,
        name: "Santos Laguna",
        specialities_id: [11, 14, 19],
        descriptiom: "Medico General & Ginecologia con 20 años de experiencia",
        image: `${process.env.URL}/static/centers/8.jpg`,
      },
    ];

    const filterData = data
      .map((item) => item)
      .filter((item) =>
        item.specialities_id.includes(Number(req.params.specialty_id))
      );

    res.status(200).json({
      code: "success",
      data: filterData,
    });
  });
  return router;
}

// res.status(200).json({
//   code: "success",
//   data: [
//     {
//       id: 1,
//       name: "Fidel Guzman Sevilla",
//       specialities_id: [1, 2, 3],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/doctors/1.jpg`,
//     },
//     {
//       id: 2,
//       name: "Rolando Sanchez",
//       specialities_id: [4, 2, 5],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/doctors/2.jpg`,
//     },
//     {
//       id: 3,
//       name: "Roberto Gonzales",
//       specialities_id: [8, 7, 6],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/doctors/3.jpg`,
//     },
//     {
//       id: 4,
//       name: "Miguel Mezza",
//       specialities_id: [8, 9, 10],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/doctors/4.jpg`,
//     },
//     {
//       id: 5,
//       name: "Alejandro Sanchez",
//       specialities_id: [11, 12, 15],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/doctors/5.jpg`,
//     },
//     {
//       id: 6,
//       name: "Mario Mejia",
//       specialities_id: [16, 17, 18],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/centers/6.jpg`,
//     },
//     {
//       id: 7,
//       name: "Orlando Mezza",
//       specialities_id: [12, 13, 19],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/centers/7.jpg`,
//     },
//     {
//       id: 8,
//       name: "Santos Laguna",
//       specialities_id: [11, 14, 19],
//       descriptiom:
//         "Medico General & Ginecologia con 20 años de experiencia",
//       image: `${process.env.URL}/static/centers/8.jpg`,
//     },
//   ],
// });
