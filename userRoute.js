import express from "express";
import { productModule } from "./productSchema.js";
import getData from "./web_scrap.js";

const router = express.Router();
router.post("/scrap", async (req, res) => {
  try {
    console.log();
    const data = await getData(req.body.catogery);
    console.log(data);
    const insertedProducts = await productModule.insertMany(data);
    res.status(201).send({
      message: "product created successfully",
      products: insertedProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error " + e.message });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    let search = req.query.search;
    console.log(search);
    await productModule
      .find({ catogery: search })
      .then((data) => {
        res.status(200).send({
          message: "Product has been retrived successfully",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .send({ message: "Error while retrieving products", error });
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error" + e.message });
  }
});

export const userRouter = router;
