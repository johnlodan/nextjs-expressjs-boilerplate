import jwt from 'jsonwebtoken'
import TokensModel from '../models/users/tokens'

export default async function (req: any, res: any, next: any) {
  try {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Token is required' })
    const isTokenExist = await TokensModel.exists({ token: token });
    if (isTokenExist) {
      jwt.verify(token, process.env.APP_SECRET_KEY!, async function (err: any, decoded: any) {
        if (err) {
          await TokensModel.findOneAndRemove({ token: token }).exec()
          // 403 whether authenticated or not, there is something wrong in the token and the
          // server doesnt recognize it. 403 will be thrown.
          res.status(403).send({ message: err })
        } else req.user = decoded
      });
      next()
      // 401 semantically means "unauthenticated"
    } else res.status(401).send({ message: 'Session Expired, Please Log In' })
  } catch (e) {
    console.error(e)
    // Code 498 indicates an expired or otherwise invalid token
    res.status(498).send({ message: 'Invalid Token' })
  }
}
