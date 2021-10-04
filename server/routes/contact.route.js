const {Router} = require('express')
const {contactController} = require('../controllers/contacts.controller')
const authmiddleware = require('../middlewares/auth.middleware')

const router = Router()

router.get('/getContacts', authmiddleware, contactController.getContacts)
router.post('/addContact', authmiddleware, contactController.addContact)
router.patch('/editContact/:id', authmiddleware, contactController.editContact)
router.delete('/deleteContact/:id', authmiddleware, contactController.deleteContact)



module.exports = router;
