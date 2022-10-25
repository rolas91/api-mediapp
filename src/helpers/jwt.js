import jwt from "jsonwebtoken"

export const generatedJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, email },
      process.env.SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err)
          reject("no generated token")
        }
        resolve(token)
      }
    )
  })
}
