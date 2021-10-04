import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  DialogContent,
  TextField,
  DialogActions,
  DialogTitle,
  Container,
  Dialog,
} from '@material-ui/core';
import { addContact } from '../../redux/features/contact';

function AddToContact({open, setOpen}) {
    const dispatch = useDispatch()
  const [contact, setContact] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: ''
  });
  const handleChange = (ev) => {
    setContact({ ...contact, [ev.target.name]: ev.target.value });
  };
 const handleAddContact = async () => {
    await dispatch(addContact(contact))
     setOpen(false)
     setContact(null)
 }
  return (
    <Container>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Введите данные</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dence"
            id="Name"
            label="Name"
            name="name"
            fullWidth
          />
          
          <TextField
            onChange={handleChange}
            margin="dence"
            id="phoneNumber"
            label="Phone number"
            name="phoneNumber"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            margin="dence"
            id="email"
            label="Email"
            name="email"
            fullWidth
          />
           <TextField
            onChange={handleChange}
            margin="dence"
            id="age"
            label="Age"
            name="age"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>

          <Button 
          onClick={handleAddContact}
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}

export default AddToContact;
