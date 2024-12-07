import { IconButton, Tooltip, alpha } from '@mui/material';

export default function EnhancedActionButton({ 
  icon, 
  onClick, 
  tooltip, 
  color = 'default', 
  shape = 'round', // 'round', 'square', 'pill'
  size = 'medium' // 'small', 'medium', 'large'
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={onClick}
        size={size}
        sx={{
          color: (theme) => theme.palette.mode === 'dark' 
            ? alpha(theme.palette.text.primary, 0.8)
            : alpha(theme.palette.text.secondary, 0.8),
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.2) 
              : alpha(theme.palette.background.default, 0.2),
          borderRadius: shape === 'round' 
            ? '50%' 
            : shape === 'square' 
              ? '4px' 
              : '24px',
          padding: shape === 'pill' ? '4px 12px' : '8px',
          transition: 'all 0.3s ease-in-out',
          boxShadow: (theme) => `0px 2px 4px ${alpha(theme.palette.text.primary, 0.2)}`,
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.1),
            boxShadow: (theme) => `0px 4px 8px ${alpha(theme.palette.text.primary, 0.3)}`,
            transform: 'scale(1.05)',
          },
          mx: 0.5,
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
