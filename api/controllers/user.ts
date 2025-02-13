import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User, { IUsers } from '../models/users/users'
import TokensModel from '../models/users/tokens'
const { validationResult } = require('express-validator')

const UserController = {
  login: async (req: any, res: any) => {
    let APP_SECRET_KEY = ""

    if (process.env.APP_SECRET_KEY) {
      APP_SECRET_KEY = process.env.APP_SECRET_KEY
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const { email, password } = req.body
    try {
      const user: IUsers = await User.findOne({ email }).exec() as IUsers
      if (!user) {
        return res.status(400).json({
          message: 'User Not Exist'
        })
      }

      const isMatch: any = await bcrypt.compare(password, user?.password!)
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect Password !' })
      }

      const payload: any = {
        _id: user.id,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      }

      jwt.sign(payload, APP_SECRET_KEY, {
        // expiresIn: 86400 * 30 //24 hours * 30 = 1 month
        expiresIn: '7d'
      }, async (err: any, token: any) => {
        if (err) throw err
        const tokens = new TokensModel({ userId: user.id, token: token })
        await tokens.save()
        res.status(200).json({ token })
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Server Error' })
    }
  },

  logout: async (req: any, res: any) => {
    try {
      const token = req.header('authorization');
      await TokensModel.findOneAndRemove({ token: token }).exec()
      res.status(200).json({ message: "Success" })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: 'Server Error' })
    }
  },

  checkSession: async (req: any, res: any) => {
    try {
      const token = req.body.token
      try {
        const isTokenExist = await TokensModel.exists({ token: token });
        if (isTokenExist) {
          jwt.verify(token, process.env.APP_SECRET_KEY!, async function (err: any, _decoded: any) {
            if (err) {
              await TokensModel.findOneAndRemove({ token: token }).exec()
              res.status(403).send({ message: err })
            } else res.status(200).send({ message: 'Valid Token' })
          });
        } else res.status(403).send({ message: { message: 'Session Expired, Please log in' } })
      } catch (e) {
        console.error(e)
        res.status(500).send({ message: 'Invalid Token' })
      }
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },
}

export default UserController
