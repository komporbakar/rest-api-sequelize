const express = require('express');
const Controller = require('../controllers/controller');
const {  signup, signin } = require('../controllers/users');
const { getAllCategory, createCategory, updateCategory, getOneCategory, deleteCategory } = require('../controllers/category');
const { Authorization } = require('../middlewares');

const router = express.Router();

router.get('/', Controller.helloWorld);

// User
router.post('/signup', signup);
router.post('/login', signin);

// Category
router.get('/category', getAllCategory)
router.get('/category/:id', getOneCategory)
router.post('/category',Authorization, createCategory)
router.put('/category/:id', Authorization, updateCategory)
router.delete('/category/:id',Authorization, deleteCategory)

module.exports = router;
