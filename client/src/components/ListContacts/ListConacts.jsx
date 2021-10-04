import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableRow,
  Avatar,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { deleteContact } from "../../redux/features/contact";
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
  const dispatch = useDispatch()
  const classes = useStyles();
  return (
    <TableRow key={contact.name}>
      <TableCell>
        <Grid container style={{ alignItems: "center" }}>
          <Grid item lg={2}>
            <Avatar alt={contact.name} src="." className={classes.avatar} />
          </Grid>
          <Grid item lg={10}>
            <Typography className={classes.name}>{contact.name} </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Typography color="primary" variant="subtitle2">
          {contact.email}
        </Typography>
      </TableCell>
      <TableCell>{contact.phoneNumber}</TableCell>
      <TableCell>{contact.age}</TableCell>
      <TableCell>
        <Button
          className="btn btn-outline-primary"
          onClick={() => setIsEditing(true)}
          color="inherit"
          variant="outlined"
        >
          ✎
        </Button>{" "}
        <Button
          color="secondary"
          variant="outlined"
           onClick={() => dispatch(deleteContact(contact._id))}
        >
          ␡
        </Button>
      </TableCell>
    </TableRow>
  );
}
