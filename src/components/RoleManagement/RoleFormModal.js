import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';

export default function RoleFormModal({ open, onClose, role, permissions }) {
  const { dispatch } = useRBAC();
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });
  const theme = useTheme();

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        name: '',
        permissions: [],
      });
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role) {
        const updatedRole = await api.updateRole({ ...formData, id: role.id });
        dispatch({ type: 'UPDATE_ROLE', payload: updatedRole });
      } else {
        const newRole = await api.createRole(formData);
        dispatch({ type: 'ADD_ROLE', payload: newRole });
      }
      onClose();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handlePermissionChange = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: newPermissions });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600, backgroundColor: theme.palette.background.paper }}>
          {role ? 'Edit Role' : 'Add Role'}
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <TextField
            fullWidth
            label="Role Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ fontWeight: 600 }}>
              Permissions
            </FormLabel>
            <FormGroup>
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission.id}
                  control={
                    <Checkbox
                      checked={formData.permissions.includes(permission.name)}
                      onChange={() => handlePermissionChange(permission.name)}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 24,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {permission.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        {permission.description}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.grey[200],
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {role ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
