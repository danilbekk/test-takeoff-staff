import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
}));

export default function TableHeadC() {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell}>Full Name</TableCell>
        <TableCell className={classes.tableHeaderCell}>Email</TableCell>
        <TableCell className={classes.tableHeaderCell}>Number</TableCell>
        <TableCell className={classes.tableHeaderCell}>Age</TableCell>
        <TableCell className={classes.tableHeaderCell}></TableCell>
      </TableRow>
    </TableHead>
  );
}
