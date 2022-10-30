import { validationResult } from "express-validator"
export const validateFields = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: "error",
      errors: errors.mapped(),
    })
  }
  next()
}
