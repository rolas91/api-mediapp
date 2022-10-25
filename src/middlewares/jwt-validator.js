import jwt from "jsonwebtoken"
export const validatedJWT = async (req, res, next) => {
  const token = req.header("x-token")
  if (!token) {
    return res
      .status(401)
      .json({ code: "error", message: "not provider token" })
  }

  try {
    const { id, email } = jwt.verify(token, process.env.SECRET)
    req.userid = id
  } catch (error) {
    console.log(error)
    return res.status(401).json({ code: "error", message: "Invalid token" })
  }

  next()
}
