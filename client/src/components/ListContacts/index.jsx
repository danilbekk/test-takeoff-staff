import React, { useEffect, useState } from "react";
import Contuct from "./ListConacts";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { tokenRemove } from "../../redux/features/user";
import AddToContact from "./AddToContact";
import { loadContacts } from "../../redux/features/contact";
import TableHeadC from "./TableHead";
import EditContact from "./EditContact";
import PreloaderContacts from "../Preloader/PreloaderContacts";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    marginTop: 10,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

export default function Contucts() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.contacts.loading);
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const search = useSelector((state) => state.contacts.search);

  const contacts = useSelector((state) => {
    return state.contacts.items.filter((contact) => {
      if (search) {
        return contact.name.toLowerCase().indexOf(search) !== -1;
      }
      return true;
    });
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveToken = () => {
    dispatch(tokenRemove());
  };

  useEffect(() => {
    dispatch(loadContacts());
  }, [dispatch]);

  return (
    <Container fixed>
      <Toolbar className={classes.toolBar}>
        <Typography>Список контактов</Typography>
          <Search />
          <Button
            onClick={() => setOpen(true)}
            color="inherit"
            variant="outlined"
          >
            Добавить контакт
          </Button>
        <Button
          onClick={handleRemoveToken}
          color="secondary"
          variant="outlined"
        >
          Выйти
        </Button>
      </Toolbar>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHeadC />
          <TableBody>
            {loading ? (
              <PreloaderContacts />
            ) : (
              contacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) =>
                  isEditing ? (
                    <EditContact
                      setIsEditing={setIsEditing}
                      contact={contact}
                    />
                  ) : (
                    <Contuct
                      key={contact._id}
                      contact={contact}
                      setIsEditing={setIsEditing}
                    />
                  )
                )
            )}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={contacts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
      <AddToContact setOpen={setOpen} open={open} />
    </Container>
  );
}
