import { Box, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function UserFilters({ filters, setFilters, roles }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      p: 2,  // Add padding for better spacing
    }}>
      {/* Search Field */}
      <TextField
        label="Search"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        size="small"
        sx={{ flex: 1 }}  // Allow the search input to grow on larger screens
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      {/* Status Dropdown */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {/* Role Dropdown */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          label="Role"
        >
          <MenuItem value="all">All</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
