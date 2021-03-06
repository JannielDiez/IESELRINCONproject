const Department = require('../models/Department');

/**
 * SYNC ALL MODELS WITH DB
 */
//sequelize.sync();
Department.sync({ force: false })
    .then(() => {
        console.log('SYNC MODEL DEPARTMENT');
    });

const departmentController = {};

departmentController.getAll = async (req, res) => {
    Department.findAll()
        .then(each => {
            const auxString = JSON.stringify(each);
            const auxObject = JSON.parse(auxString);
            const data = auxObject;
            
            return res.json({ success: true, data: data });
        }).catch(err => {
            console.log(err)
        })
};

departmentController.getId = (req, res) => {
    const { id } = req.params;
    Department.findAll({ where: { id } })
        .then(each => {
            if (each.length > 0) {
                const data = JSON.parse(JSON.stringify(each));
                
                return res.json({ success: true, data: data });
            } else {
                res.json({ status: `The department doesn't exist` });
            }
        })
        .catch(err => {
            console.log(err)
        })
};

//departmentController.Creates
departmentController.add = (req, res) => {
    const { name } = req.body;
    Department.create({ name })
        .then(each => {
            if (each.id) {
                res.json({ success: true, message: `Successfully added, id: ${each.id}` });
            } else {
                res.json({ status: 'Error' });
            }
        })
        .catch(err => {
            console.log(err)
        })

}

//departmentController.Updates
departmentController.edit = (req, res) => {
    //const {id}=req.params;
    const { id, name } = req.body;
    
    Department.update({ name },
        { where: { id } })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            if (data.length > 0) {
                res.json({ success: true, message: 'Successfully updated' });
            } else {
                res.json({ status: 'Error' });
            }

        })
        .catch(err => {
            console.log(err)
        })
}


departmentController.delete = (req, res) => {
    const { id } = req.params;
    Department.destroy({ where: { id } })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            if (data == 1) {
                res.json({ success: true, message: 'Succesfully deleted' });
            } else {
                res.json({ status: 'Error' });
            }

        })
        .catch(err => {
            console.log(err)
        });

}
module.exports = departmentController;
