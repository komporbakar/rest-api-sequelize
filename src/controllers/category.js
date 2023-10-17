const { StatusCodes } = require('http-status-codes');
const { category } = require('../models');
const { default: slugify } = require('slugify');

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      const result = await category.findAll();
      return res.status(StatusCodes.OK).json({
        error: false,
        message: 'Success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: 'Fied must be provided',
        });
      }
      const slug = slugify(name).toLowerCase();
      const result = await category.create({
        name,
        slug: slug,
      });

      return res.status(StatusCodes.CREATED).json({
        error: false,
        message: 'Succesfully Created Category',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  getOneCategory: async(req, res, next) => {
   try {
    const {id} = req.params

    const checkUser = await category.findByPk(id);
    if (!checkUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: 'Category Not Found',
      });
    }

    const response = await category.findByPk(id) 

    if(!response) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true,
            message: 'Category Not Found'
        })
    }

    return res.status(StatusCodes.OK).json({
        error: false,
        message: 'Success Get Data Category',
        data: response
    })
   } catch (err) {
    next(err)
   }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      const { id } = req.params;

      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: 'Fied must be provided',
        });
      }

      const checkUser = await category.findByPk(id);
      if (!checkUser) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: true,
          message: 'Category Not Found',
        });
      }

      const slug = slugify(name).toLowerCase();
      const result = await category.update(
        {
          name,
          slug: slug,
        },
        {
          where: { id },
          returning: true,
        }
      );


      return res.status(StatusCodes.OK).json({
        error: false,
        message: 'Succesfully Updated Category',
        // data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteCategory: async(req, res, next) => {
    try {
        const {id} = req.params
    
        const checkUser = await category.findByPk(id);
        if (!checkUser) {
          return res.status(StatusCodes.NOT_FOUND).json({
            error: true,
            message: 'Category Not Found',
          });
        }
    
        const response = await category.findByPk(id) 
    
        if(!response) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: true,
                message: 'Category Not Found'
            })
        }

        const result = await category.destroy({
            where: {
                id: id
            }
        })
        if(!result) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: true,
                message: 'Failed Deleted Category'
            })
        }
    
        return res.status(StatusCodes.OK).json({
            error: false,
            message: 'Deleted Category Succesfull',
        })
       } catch (err) {
        next(err)
       }
  }
};
