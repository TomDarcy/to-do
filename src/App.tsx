import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import New from './pages/NewPage';
import Stats from './pages/StatPage';
import SimpleBottomNavigation from './components/bottomNav';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<New />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Suspense>
      <SimpleBottomNavigation />
    </ThemeProvider>
    </>
  );
}

export default App;
