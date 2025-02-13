import TeachersModel, { ITeachers } from '../models/teachers'
import { ObjectId } from 'bson'

const TeachersController = {
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
      var aggregate = TeachersModel.aggregate([
        {
          $project: {
            firstName: 1,
            lastName: 1,
            subject: 1,
            status: 1,
            updatedAt: 1,
            createdAt: 1
          }
        }
      ]);
      TeachersModel.aggregatePaginate(aggregate, options)
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
      const teachers = await TeachersModel.aggregate([
        { $match: { _id: new ObjectId(paramId) } }
      ])
      res.json(teachers[0])
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  create: async (req: any, res: any) => {
    try {
      const teachers = new TeachersModel(req.body)
      await teachers.save()
      res.json(teachers)
    }
    catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await TeachersModel.findOneAndUpdate({ _id: paramId },
        req.body
      ).exec() as ITeachers
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await TeachersModel.findOneAndRemove({ _id: paramId }).exec()
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },
}

export default TeachersController
