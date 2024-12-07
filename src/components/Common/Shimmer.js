import { Box, keyframes, useTheme } from '@mui/material';

const shimmer = keyframes`
  0% {
    background-position: -1500px 0;
  }
  100% {
    background-position: 1500px 0;
  }
`;

export default function Shimmer({
  width = '100%',
  height = '24px',
  borderRadius = '8px',
}) {
  const theme = useTheme(); // Access the theme

  return (
    <Box
      sx={{
        width,
        height,
        borderRadius,
        background: `linear-gradient(
          90deg,
          ${theme.palette.mode === 'dark' ? '#0f172a' : '#e5e7eb'} 0%,
          ${theme.palette.mode === 'dark' ? '#1e293b' : '#f3f4f6'} 50%,
          ${theme.palette.mode === 'dark' ? '#0f172a' : '#e5e7eb'} 100%
        )`,
        backgroundSize: '3000px 100%',
        animation: `${shimmer} 1.8s ease-in-out infinite`,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 1px 3px rgba(0, 0, 0, 0.5)'
            : '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${theme.palette.mode === 'dark' ? '#1e293b' : '#e5e7eb'}`,
      }}
    />
  );
}
