import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/new');
        break;
      case 2:
        navigate('/stats');
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
        sx={{ width: '100%' }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="New" icon={<AddIcon />} />
        <BottomNavigationAction label="Stats" icon={<QueryStatsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
