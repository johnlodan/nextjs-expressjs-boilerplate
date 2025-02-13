import StudentsModel, { IStudents } from '../models/students'
import { ObjectId } from 'bson'

const StudentsController = {
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
      var aggregate = StudentsModel.aggregate([
        {
          $project: {
            firstName: 1,
            lastName: 1,
            status: 1,
            updatedAt: 1,
            createdAt: 1
          }
        }
      ]);
      StudentsModel.aggregatePaginate(aggregate, options)
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
      const students = await StudentsModel.aggregate([
        { $match: { _id: new ObjectId(paramId) } }
      ])
      res.json(students[0])
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  create: async (req: any, res: any) => {
    try {
      const students = new StudentsModel(req.body)
      await students.save()
      res.json(students)
    }
    catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await StudentsModel.findOneAndUpdate({ _id: paramId },
        req.body
      ).exec() as IStudents
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      const paramId = req.params.id
      await StudentsModel.findOneAndRemove({ _id: paramId }).exec()
      res.json({ _id: paramId })
    } catch (err: any) {
      res.status(400).json({ message: "An error has occured.", error: err?.toString() })
    }
  },
}

export default StudentsController
