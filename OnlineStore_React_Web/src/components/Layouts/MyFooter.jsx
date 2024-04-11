import { Box, Paper, Stack, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export const MyFooter = () => {
  return (
    <Box
     sx={{
        marginTop: 'calc(10%https://localhost:3000/)',
     }}
    >
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
        component='footer'
        variant='outlined'
        square
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <CopyrightIcon fontSize="small" />
          <Typography variant="body1">
            {new Date().getFullYear()} All The Clouds
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
