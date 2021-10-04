import { Box } from '@mui/material';
import { CircularProgress } from '@material-ui/core';


export default function PreloaderContacts() {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    );
  }