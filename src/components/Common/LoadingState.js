import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingState({ message = 'Please wait...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        gap: 3,
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1e293b' : '#f9f9f9',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0px 4px 10px rgba(0, 0, 0, 0.7)'
            : '0px 4px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '300px',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <CircularProgress
        size={40}
        thickness={5}
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.light
              : theme.palette.secondary.main,
          animation: 'pulse 1.5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
      />
      <Typography
        variant="subtitle1"
        color={(theme) =>
          theme.palette.mode === 'dark' ? 'text.primary' : 'text.secondary'}
        sx={{ fontWeight: 600, letterSpacing: '0.03em' }}
      >
        {message}
      </Typography>
    </Box>
  );
}
