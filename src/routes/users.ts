import { Router } from "express";
import { User } from "../entities/user";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const user = await User.findOne({ where: { id } });
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = User.create({
      firstName,
      lastName,
      email,
    });
    await user.save();
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const users = await User.delete(id);
    res.json({ message: "deleted user with id:" + id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
