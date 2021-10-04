import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
  Avatar,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { editContact } from "../../redux/features/contact";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));
export default function Contuct({ contact, setIsEditing }) {
  const dispatch = useDispatch();
  const [dataContact, setDataContact] = useState({
    name: contact.name,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    age: contact.age,
  });
  const classes = useStyles();

  const handleChange = (ev) => {
    setDataContact({ ...dataContact, [ev.target.name]: ev.target.value });
  };

  const handleEdit = async () => {
    await dispatch(editContact(contact._id, dataContact));

    setIsEditing(false);
  };
  return (
    <TableRow key={contact.firstName}>
      <TableCell>
        <Grid container style={{alignItems:"center"}}>
          <Grid item lg={2} >
            <Avatar
              alt={contact.name}
              src="."
              className={classes.avatar}
            />
          </Grid>
          <Grid item lg={10} >
            <TextField
              onChange={handleChange}
              value={dataContact.name}
              name="name"
            />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleChange}
          value={dataContact.email}
          name="email"
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleChange}
          value={dataContact.phoneNumber}
          name="phoneNumber"
        />
      </TableCell>
      <TableCell>
        <TextField 
        style={{width: 50}}
        onChange={handleChange} 
        value={dataContact.age} 
        name="age" />
       
      </TableCell>
      

      <TableCell>
        <Button color="primary" variant="contained" onClick={handleEdit}>
          save
        </Button>{" "}
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setIsEditing(false)}
        >
          ↩
        </Button>
      </TableCell>
    </TableRow>
  );
}
