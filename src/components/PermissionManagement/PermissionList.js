import {
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  useTheme,
  ListItemIcon,
  Typography,
  Paper,
} from '@mui/material';
import { getPermissionIcon } from '../../utils/iconMapping';
import Shimmer from '../Common/Shimmer';

export default function PermissionList({ permissions, loading }) {
  const theme = useTheme();

  if (loading) {
    return (
      <List>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item}>
            <ListItem>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Shimmer width={24} height={24} borderRadius="50%" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Shimmer width="40%" height={20} sx={{ mb: 1 }} />
                  <Shimmer width="70%" height={16} />
                </Box>
              </Box>
            </ListItem>
            {item < 5 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>
    );
  }

  return (
    <List>
      {permissions.map((permission, index) => {
        const IconComponent = getPermissionIcon(permission.name);

        return (
          <Box key={permission.id}>
            <ListItem
              sx={{
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
                  : '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, background-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.05)',
                },
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
                  minWidth: 50,
                }}
              >
                <IconComponent sx={{ fontSize: 24 }} />
              </ListItemIcon>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                  }}
                >
                  {permission.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {permission.description}
                </Typography>
              </Box>
            </ListItem>

            {index < permissions.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        );
      })}
    </List>
  );
}
