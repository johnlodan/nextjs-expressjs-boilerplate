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
          res.status(403).send({ message: err })
        } else req.user = decoded
      });
      next()
    } else res.status(403).send({ message: 'Session Expired, Please log in' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Invalid Token' })
  }
}
