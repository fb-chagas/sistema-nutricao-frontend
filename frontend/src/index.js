import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import CadastroNFe from './components/CadastroNFe';
// Outros componentes seriam importados aqui

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Componente principal da aplicação
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nfe/cadastro" element={<CadastroNFe />} />
          {/* Outras rotas seriam definidas aqui */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

// Renderização da aplicação
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
