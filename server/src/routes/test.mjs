import { Router } from "express";

const router = Router();

router.get("/test", (request, response) => {
  const tests = {
    _id: 1,
    titile: "This is test",
  };
  response.json(tests);
});

router.post("/test", (request, response) => {
  const { _id, title } = request.body;
  const tests = {
    _id,
    title,
  };
  response.status(200).json(tests);
});
export default router;
