import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dados simulados - seriam substituídos por dados reais da API
const mockInsumos = [
  { id: 1, nome: 'Bagaço de Cana' },
  { id: 2, nome: 'Casca de Soja' },
  { id: 3, nome: 'Calcário' },
  { id: 4, nome: 'Caroço de Algodão' },
  { id: 5, nome: 'DDGs' }
];

const mockMeses = [
  { id: '2025-01', nome: 'Janeiro 2025' },
  { id: '2025-02', nome: 'Fevereiro 2025' },
  { id: '2025-03', nome: 'Março 2025' },
  { id: '2025-04', nome: 'Abril 2025' },
  { id: '2025-05', nome: 'Maio 2025' }
];

const mockCustoMedio = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  datasets: [
    {
      label: 'Bagaço de Cana',
      data: [130, 135, 142, 138, 145],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Casca de Soja',
      data: [800, 820, 790, 810, 830],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'DDGs',
      data: [1053, 1060, 1080, 1100, 1090],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const mockVolumeMensal = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  datasets: [
    {
      label: 'Volume de Compras (ton)',
      data: [1200, 1350, 980, 1420, 1150],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const mockDistribuicaoInsumos = {
  labels: ['Bagaço de Cana', 'Casca de Soja', 'Calcário', 'Caroço de Algodão', 'DDGs'],
  datasets: [
    {
      label: 'Distribuição de Insumos',
      data: [35, 20, 10, 15, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(53, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(53, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const mockAlertasEstoque = [
  { id: 1, insumo: 'Bagaço de Cana', estoque: 161020, minimo: 100000, status: 'ok' },
  { id: 2, insumo: 'Casca de Soja', estoque: 76270, minimo: 80000, status: 'alerta' },
  { id: 3, insumo: 'Calcário', estoque: 36392, minimo: 40000, status: 'alerta' },
  { id: 4, insumo: 'DDGs', estoque: 9587, minimo: 10000, status: 'alerta' },
];

const mockContratosProximos = [
  { id: 1, numero: 'CT-2025-001', fornecedor: 'Fornecedor A', insumo: 'Bagaço de Cana', quantidade: 455250, entrega: '2025-06-15', status: 'pendente' },
  { id: 2, numero: 'CT-2025-002', fornecedor: 'Fornecedor B', insumo: 'Casca de Soja', quantidade: 177830, entrega: '2025-06-10', status: 'pendente' },
  { id: 3, numero: 'CT-2025-003', fornecedor: 'Fornecedor C', insumo: 'DDGs', quantidade: 252370, entrega: '2025-06-20', status: 'pendente' },
];

const Dashboard = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('2025-05');
  const [insumoSelecionado, setInsumoSelecionado] = useState(0); // 0 = Todos
  const [tabAtiva, setTabAtiva] = useState(0);
  
  // Aqui seriam feitas as chamadas à API para buscar os dados reais
  useEffect(() => {
    // Exemplo de chamada à API:
    // fetch(`/api/dashboard/custo-medio?periodo=${periodoSelecionado}&insumo=${insumoSelecionado}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Atualizar dados do dashboard
    //   });
  }, [periodoSelecionado, insumoSelecionado]);
  
  const handleChangePeriodo = (event) => {
    setPeriodoSelecionado(event.target.value);
  };
  
  const handleChangeInsumo = (event) => {
    setInsumoSelecionado(event.target.value);
  };
  
  const handleChangeTab = (event, newValue) => {
    setTabAtiva(newValue);
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Cabeçalho */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography component="h1" variant="h4" color="primary">
                Dashboard de Nutrição
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="periodo-label">Período</InputLabel>
                  <Select
                    labelId="periodo-label"
                    id="periodo-select"
                    value={periodoSelecionado}
                    label="Período"
                    onChange={handleChangePeriodo}
                  >
                    {mockMeses.map(mes => (
                      <MenuItem key={mes.id} value={mes.id}>{mes.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="insumo-label">Insumo</InputLabel>
                  <Select
                    labelId="insumo-label"
                    id="insumo-select"
                    value={insumoSelecionado}
                    label="Insumo"
                    onChange={handleChangeInsumo}
                  >
                    <MenuItem value={0}>Todos os Insumos</MenuItem>
                    {mockInsumos.map(insumo => (
                      <MenuItem key={insumo.id} value={insumo.id}>{insumo.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Button variant="contained" color="primary">
                  Atualizar
                </Button>
              </Box>
            </Box>
            
            <Divider />
            
            <Box sx={{ mt: 2 }}>
              <Tabs value={tabAtiva} onChange={handleChangeTab} centered>
                <Tab label="Visão Geral" />
                <Tab label="Custos" />
                <Tab label="Estoque" />
                <Tab label="Contratos" />
              </Tabs>
            </Box>
          </Paper>
        </Grid>
        
        {/* Conteúdo da Tab Visão Geral */}
        {tabAtiva === 0 && (
          <>
            {/* Cards de Resumo */}
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Custo Médio Geral" 
                  subheader="Maio 2025"
                  avatar={<AttachMoneyIcon color="primary" />}
                />
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    R$ 983,33
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <TrendingUpIcon color="error" />
                    <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                      +2,5% em relação ao mês anterior
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Volume Total" 
                  subheader="Maio 2025"
                  avatar={<InventoryIcon color="primary" />}
                />
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    1.150 ton
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <TrendingDownIcon color="success" />
                    <Typography variant="body2" color="success" sx={{ ml: 1 }}>
                      -19% em relação ao mês anterior
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Alertas de Estoque" 
                  subheader="Maio 2025"
                  avatar={<WarningIcon color="warning" />}
                />
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    3
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Insumos abaixo do estoque mínimo
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Contratos Próximos" 
                  subheader="Próximos 30 dias"
                  avatar={<CheckCircleIcon color="primary" />}
                />
                <CardContent>
                  <Typography variant="h3" component="div" align="center">
                    3
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Entregas programadas
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Gráficos */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Evolução do Custo Médio
                </Typography>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Line 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }} 
                    data={mockCustoMedio} 
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Distribuição de Insumos
                </Typography>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Pie 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }} 
                    data={mockDistribuicaoInsumos} 
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Volume Mensal de Compras
                </Typography>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bar 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }} 
                    data={mockVolumeMensal} 
                  />
                </Box>
              </Paper>
            </Grid>
            
            {/* Tabelas */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Alertas de Estoque
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Insumo</TableCell>
                      <TableCell align="right">Estoque Atual</TableCell>
                      <TableCell align="right">Estoque Mínimo</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockAlertasEstoque.map((alerta) => (
                      <TableRow key={alerta.id}>
                        <TableCell>{alerta.insumo}</TableCell>
                        <TableCell align="right">{alerta.estoque.toLocaleString()}</TableCell>
                        <TableCell align="right">{alerta.minimo.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          {alerta.status === 'ok' ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <WarningIcon color="warning" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Contratos Próximos
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contrato</TableCell>
                      <TableCell>Insumo</TableCell>
                      <TableCell align="right">Quantidade</TableCell>
                      <TableCell align="right">Data Entrega</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockContratosProximos.map((contrato) => (
                      <TableRow key={contrato.id}>
                        <TableCell>{contrato.numero}</TableCell>
                        <TableCell>{contrato.insumo}</TableCell>
                        <TableCell align="right">{contrato.quantidade.toLocaleString()}</TableCell>
                        <TableCell align="right">{new Date(contrato.entrega).toLocaleDateString('pt-BR')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </>
        )}
        
        {/* Conteúdo das outras tabs seria implementado de forma similar */}
        {tabAtiva === 1 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Análise de Custos</Typography>
              <Typography>Conteúdo da aba de custos em desenvolvimento...</Typography>
            </Paper>
          </Grid>
        )}
        
        {tabAtiva === 2 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Controle de Estoque</Typography>
              <Typography>Conteúdo da aba de estoque em desenvolvimento...</Typography>
            </Paper>
          </Grid>
        )}
        
        {tabAtiva === 3 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Gestão de Contratos</Typography>
              <Typography>Conteúdo da aba de contratos em desenvolvimento...</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

// Componente de tabela auxiliar
const Table = ({ children }) => (
  <Box sx={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      {children}
    </table>
  </Box>
);

const TableHead = ({ children }) => (
  <thead>
    {children}
  </thead>
);

const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

const TableCell = ({ children, align }) => (
  <td style={{ 
    padding: '16px', 
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    textAlign: align || 'left'
  }}>
    {children}
  </td>
);

export default Dashboard;
