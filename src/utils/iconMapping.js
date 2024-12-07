import {
  Security as DefaultPermissionIcon,
  Visibility as ReadIcon,
  Edit as WriteIcon,
  Delete as DeleteIcon,
  ManageAccounts as ManageUsersIcon,
  AdminPanelSettings as ManageRolesIcon,
  SupervisorAccount as AdminIcon,
  Edit as EditorIcon,
  RemoveRedEye as ViewerIcon,
  Person as DefaultRoleIcon,
} from '@mui/icons-material';

const permissionIcons = {
  read: ReadIcon,
  write: WriteIcon,
  delete: DeleteIcon,
  'manage users': ManageUsersIcon,
  'manage roles': ManageRolesIcon,
};

const roleIcons = {
  admin: AdminIcon,
  editor: EditorIcon,
  viewer: ViewerIcon,
};

export const getPermissionIcon = (permission) => {
  const icon = permissionIcons[permission?.toLowerCase()];
  return icon || DefaultPermissionIcon;
};

export const getRoleIcon = (role) => {
  const icon = roleIcons[role?.toLowerCase()];
  return icon || DefaultRoleIcon;
};
