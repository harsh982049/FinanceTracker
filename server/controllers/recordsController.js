const Record = require('../model/recordModel');

const addRecord = async (req, res, next) => {
    try
    {
        const {description, amount, category, paymentMethod, userId} = req.body;
        // console.log(description, amount, category, paymentMethod, userId);
        const record = await Record.create({description, amount, category, paymentMethod, user: userId});
        if(!record)
        {
            return res.json({status: false, msg: 'Could not create record in the database. Please try again'});
        }
        return res.json({status: true, record});
    }
    catch(error)
    {
        next(error);
    }
};

const getAllRecords = async (req, res, next) => {
    try
    {
        // console.log(req.params);
        const {id: user} = req.params;
        const {sort} = req.query;
        // console.log(user);
        let result = Record.find({user});
        if(sort)
        {
            result = result.sort(sort);
        }
        const records = await result;
        // console.log(records);
        if(!records)
        {
            return res.json({status: false, msg: 'There was an error fetching user data from database. Please try again'});
        }
        return res.json({status: true, records});
    }
    catch(error)
    {
        next(error);
    }
};

const updateRecord = async (req, res, next) => {
    try
    {
        const {id: recordId} = req.params;
        // console.log(req.body);
        const record = await Record.findOneAndUpdate({_id: recordId}, req.body);
        // console.log(record);
        if(!record)
        {
            return res.json({status: false, msg: 'There was an error updating the record in the database. Please try again'});
        }
        return res.json({status: true, record});
    }
    catch(error)
    {
        next(error);
    }
};

const deleteRecord = async (req, res, next) => {
    try
    {
        const {id: recordId} = req.params;
        const record = await Record.findOneAndDelete({_id: recordId});
        // console.log(record);
        if(!record)
        {
            return res.json({status: false, msg: 'There was an error in deleting the record from the database. Please try again'});
        }
        return res.json({status: true, record});
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {addRecord, getAllRecords, updateRecord, deleteRecord};