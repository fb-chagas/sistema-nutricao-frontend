import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CadastroNFe from './pages/CadastroNFe';
import Contratos from './pages/Contratos';
import ControleMensal from './pages/ControleMensal';
import Fechamento from './pages/Fechamento';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cadastro-nfe" element={<CadastroNFe />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/controle-mensal" element={<ControleMensal />} />
          <Route path="/fechamento" element={<Fechamento />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
