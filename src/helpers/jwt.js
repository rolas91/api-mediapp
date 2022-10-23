import jwt from "jsonwebtoken"

export const generatedJWT = (user) => {
  return new Promise((resolve, reject) => {
    const { id, email } = user
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
