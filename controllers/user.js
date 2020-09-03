const model = require('../models/user');
const { Op } = require("sequelize");


exports.allUser = (req,res,next) => {
    let id = req.params.id;
    model.findAll({
        where: {
            id: {
                [Op.ne]: id,   
          }
        },
        attributes: ['id', 'name']
      }).then(
          (data) => {
              let newData =  data.map((item) => {
                return item.dataValues
              });
              res.status(200).json({
                  payload: newData,
                  message: 'User list fetched successfully'
              })
          }
      ).catch(
          (error) => {
              res.status(500).json({
                  message: 'Internal server error'
              })
          }
      )      
};

