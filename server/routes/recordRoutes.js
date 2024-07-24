const express = require('express');
const router = express.Router();
const {addRecord, getAllRecords, updateRecord, deleteRecord} = require('../controllers/recordsController');

router.post('/addrecord', addRecord);
router.get('/getallrecords/:id', getAllRecords);
router.patch('/updaterecord/:id', updateRecord);
router.delete('/deleterecord/:id', deleteRecord);

module.exports = router;