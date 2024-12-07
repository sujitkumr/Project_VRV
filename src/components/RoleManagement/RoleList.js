import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Box,
  Divider,
  useTheme,
  ListItemIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import ActionButton from '../Common/ActionButton';
import { getPermissionIcon, getRoleIcon } from '../../utils/iconMapping';

const PermissionChip = ({ permission }) => {
  const theme = useTheme();
  const IconComponent = getPermissionIcon(permission);
  
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 16,
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(0, 0, 0, 0.08)',
        color: theme.palette.text.secondary,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        margin: '0 4px 4px 0',
      }}
    >
      <IconComponent sx={{ fontSize: 14 }} />
      {permission}
    </Box>
  );
};

export default function RoleList({ roles, onEdit, onDelete, loading }) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={40} color="primary" />
      </Box>
    );
  }

  return (
    <List>
      {roles.map((role, index) => {
        const IconComponent = getRoleIcon(role.name);
        
        return (
          <Box key={role.id}>
            <ListItem
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.02)',
                },
                py: 2,
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, box-shadow 0.3s',
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
              <ListItemText
                primary={role.name}
                secondary={
                  <Box sx={{ mt: 1 }}>
                    {role.permissions.map((permission) => (
                      <PermissionChip key={permission} permission={permission} />
                    ))}
                  </Box>
                }
                primaryTypographyProps={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
                secondaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: theme.palette.text.secondary,
                }}
              />
              <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                <ActionButton
                  icon={<EditIcon />}
                  onClick={() => onEdit(role)}
                  tooltip="Edit role"
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                />
                <ActionButton
                  icon={<DeleteIcon />}
                  onClick={() => onDelete(role.id)}
                  tooltip="Delete role"
                  sx={{
                    color: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: theme.palette.error.light,
                    },
                    ml: 1,
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index < roles.length - 1 && <Divider sx={{ backgroundColor: theme.palette.divider }} />}
          </Box>
        );
      })}
    </List>
  );
}
