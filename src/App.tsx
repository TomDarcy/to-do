import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import New from './pages/NewPage';
import Stats from './pages/StatPage';
import SimpleBottomNavigation from './components/bottomNav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import EditTask from './pages/EditPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007588',
    },
    background: {
      default: '#02030a',
      paper: '#02030a',
    },
    text: {
      primary: grey[300],
      secondary: grey[500],
    },
    divider: grey[700],
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: grey[300],
        },
        textPrimary: {
          color: '#007588',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#02030a',
          color: grey[300],
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: grey[500],
          '&.Mui-selected': {
            color: '#00bfdb',
          },
        },
      },
    },
  },
});

const HomePage = React.lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<New />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/edit/:id" element={<EditTask />} /> {/* Add this line */}
        </Routes>
      </Suspense>
      <SimpleBottomNavigation />
    </ThemeProvider>
  );
}
export default App;
