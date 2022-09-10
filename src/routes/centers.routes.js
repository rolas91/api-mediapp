import express from "express";
const router = express.Router();

export default function () {
  router.get("/centers", (req, res) => {
    res.status(200).json({
      code: "success",
      data: [
        {
          id: 1,
          name: "Negocio1",
          image: `${process.env.URL}/static/centers/1.jpg`,
        },
        {
          id: 2,
          name: "Negocio2",
          image: `${process.env.URL}/static/centers/2.jpg`,
        },
        {
          id: 3,
          name: "Negocio3",
          image: `${process.env.URL}/static/centers/3.jpg`,
        },
        {
          id: 4,
          name: "Negocio4",
          image: `${process.env.URL}/static/centers/4.jpg`,
        },
        {
          id: 5,
          name: "Negocio5",
          image: `${process.env.URL}/static/centers/5.jpg`,
        },
        {
          id: 6,
          name: "Negocio6",
          image: `${process.env.URL}/static/centers/6.jpg`,
        },
        {
          id: 7,
          name: "Negocio7",
          image: `${process.env.URL}/static/centers/7.jpg`,
        },
      ],
    });
  });
  return router;
}
