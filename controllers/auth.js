const model = require('../models/user');

exports.signup =  (req,res,next) => {
 model.create({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
 }).then(
     (data) => {
         console.log("data stored successfully");
         res.json({
             'message': 'user added successfully!!'
         });
     }
 ).catch(
     (error) => {
         if(error.original.code == 'ER_DUP_ENTRY'){
         res.status(419).json({
             'message': 'Internal server error'
         })
     }
    else {
        res.status(500).json({
            'message': 'Internal server error'
        })
    }
 
});
}

exports.login = (req,res,next) => {

    model.findAll({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      }).then(
          (data) => {
             if(data.length){
                delete data[0].dataValues.password;
              res.status(200).json({
                  payload: data[0].dataValues,
                  message: 'user fetched'
              })
          }else {
              res.status(419).json({
                  message: 'no user found'
              })
          }
          }
      ).catch(
          (error) => {
              res.status(500).json({
                  message: 'Internal server error'
              })
          }
      )
}