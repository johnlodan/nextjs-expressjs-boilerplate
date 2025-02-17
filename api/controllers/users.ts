import UsersModel, { IUsers } from '../models/users/users'
import { ObjectId } from 'bson'

const UsersController = {
  find: async (req: any, res: any) => {
    try {
      let { page, limit, sort, } = req.query
      page = page || 1
      limit = limit || 0
      sort = sort || 'desc'

      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: sort },
        customLabels: {
          docs: 'data',
          totalDocs: 'total'
        }
      };
      var aggregate = UsersModel.aggregate([
        {
          $project: {
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1,
            status: 1,
            updatedAt: 1,
            createdAt: 1
          }
        }
      ]);
      UsersModel.aggregatePaginate(aggregate, options)
        .then(function (results: any) {
          res.json(results)
        }).catch(function (err: any) {
          res.status(400).json({ message: "An error has occured.", error: err?.toString() })
        });
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  findId: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      const user = await UsersModel.findOne({ _id: new ObjectId(paramId) }).exec()
      res.json(user)
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  current: async (req: any, res: any) => {
    try {
      const userId = req.user._id
      const user = await UsersModel.findOne({ _id: new ObjectId(userId) })
        .select("_id firstName lastName email role");
      res.json(user)
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  create: async (req: any, res: any) => {
    try {
      const users = new UsersModel(req.body)
      await users.save()
      res.json(users)
    }
    catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await UsersModel.findOneAndUpdate({ _id: paramId },
        req.body
      ).exec() as IUsers
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await UsersModel.findOneAndRemove({ _id: paramId }).exec()
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },
}

export default UsersController
