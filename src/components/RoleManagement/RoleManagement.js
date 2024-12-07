import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRBAC } from '../../context/RBACContext';
import { api } from '../../services/api';
import RoleList from './RoleList';
import RoleFormModal from './RoleFormModal';

export default function RoleManagement() {
  const { state, dispatch } = useRBAC();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const roles = await api.getRoles();
      dispatch({ type: 'SET_ROLES', payload: roles });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchPermissions = async () => {
    try {
      const permissions = await api.getPermissions();
      dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const handleAddRole = () => {
    setSelectedRole(null);
    setOpenModal(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await api.deleteRole(roleId);
      dispatch({ type: 'DELETE_ROLE', payload: roleId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Role Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRole}
          sx={{
            boxShadow: 2,
            ':hover': { boxShadow: 6 },
            padding: '8px 20px',
            fontWeight: 500,
            fontSize: '1rem',
            borderRadius: 20,
          }}
        >
          Add Role
        </Button>
      </Box>

      {state.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : state.error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <Typography variant="h6" color="error">{state.error}</Typography>
        </Box>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <RoleList
            roles={state.roles}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
            loading={state.loading}
          />
        </Paper>
      )}

      <RoleFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        role={selectedRole}
        permissions={state.permissions}
      />
    </Box>
  );
}
