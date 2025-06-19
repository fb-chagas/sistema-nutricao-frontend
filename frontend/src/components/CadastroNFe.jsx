import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Snackbar,
  Alert,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// Este componente seria importado de um serviço real
const mockFornecedores = [
  { id: 1, nome: 'Fornecedor A' },
  { id: 2, nome: 'Fornecedor B' },
  { id: 3, nome: 'Fornecedor C' }
];

// Este componente seria importado de um serviço real
const mockInsumos = [
  { id: 1, nome: 'Bagaço de Cana', unidade_medida: 'kg' },
  { id: 2, nome: 'Casca de Soja', unidade_medida: 'kg' },
  { id: 3, nome: 'Calcário', unidade_medida: 'kg' },
  { id: 4, nome: 'Caroço de Algodão', unidade_medida: 'kg' },
  { id: 5, nome: 'DDGs', unidade_medida: 'kg' }
];

const validationSchema = yup.object({
  numero: yup.string().required('Número da NF é obrigatório'),
  serie: yup.string().required('Série é obrigatória'),
  dataEmissao: yup.date().required('Data de emissão é obrigatória'),
  dataEntrada: yup.date().required('Data de entrada é obrigatória'),
  fornecedorId: yup.number().required('Fornecedor é obrigatório'),
  valorTotal: yup.number().positive('Valor deve ser positivo').required('Valor total é obrigatório'),
  chaveAcesso: yup.string().nullable(),
  observacoes: yup.string().nullable()
});

const itemValidationSchema = yup.object({
  insumoId: yup.number().required('Insumo é obrigatório'),
  quantidade: yup.number().positive('Quantidade deve ser positiva').required('Quantidade é obrigatória'),
  valorUnitario: yup.number().positive('Valor unitário deve ser positivo').required('Valor unitário é obrigatório')
});

const CadastroNFe = () => {
  const [fornecedores, setFornecedores] = useState(mockFornecedores);
  const [insumos, setInsumos] = useState(mockInsumos);
  const [itens, setItens] = useState([]);
  const [itemAtual, setItemAtual] = useState({
    insumoId: '',
    quantidade: '',
    valorUnitario: '',
    valorTotal: ''
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const formik = useFormik({
    initialValues: {
      numero: '',
      serie: '',
      dataEmissao: new Date(),
      dataEntrada: new Date(),
      fornecedorId: '',
      valorTotal: '',
      valorIcms: '',
      valorIpi: '',
      valorFrete: '',
      valorSeguro: '',
      valorOutrasDespesas: '',
      valorDesconto: '',
      chaveAcesso: '',
      observacoes: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Aqui seria feita a chamada à API para salvar a NFe
      console.log('Dados da NFe:', values);
      console.log('Itens da NFe:', itens);
      
      // Simulação de sucesso
      showAlert('Nota fiscal cadastrada com sucesso!', 'success');
      
      // Limpar formulário após sucesso
      formik.resetForm();
      setItens([]);
    }
  });

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    
    setItemAtual(prev => {
      const newItem = { ...prev, [name]: value };
      
      // Calcular valor total automaticamente
      if ((name === 'quantidade' || name === 'valorUnitario') && 
          newItem.quantidade && newItem.valorUnitario) {
        newItem.valorTotal = (parseFloat(newItem.quantidade) * parseFloat(newItem.valorUnitario)).toFixed(2);
      }
      
      return newItem;
    });
  };

  const adicionarItem = () => {
    try {
      // Validar item
      itemValidationSchema.validateSync(itemAtual);
      
      // Buscar nome do insumo
      const insumo = insumos.find(i => i.id === parseInt(itemAtual.insumoId));
      
      const novoItem = {
        ...itemAtual,
        id: Date.now(), // ID temporário
        insumoNome: insumo ? insumo.nome : 'Desconhecido',
        valorTotal: parseFloat(itemAtual.quantidade) * parseFloat(itemAtual.valorUnitario)
      };
      
      setItens([...itens, novoItem]);
      
      // Limpar formulário de item
      setItemAtual({
        insumoId: '',
        quantidade: '',
        valorUnitario: '',
        valorTotal: ''
      });
      
      // Recalcular valor total da NF
      const novoValorTotal = [...itens, novoItem].reduce((total, item) => 
        total + parseFloat(item.valorTotal), 0).toFixed(2);
      
      formik.setFieldValue('valorTotal', novoValorTotal);
      
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const removerItem = (id) => {
    const novosItens = itens.filter(item => item.id !== id);
    setItens(novosItens);
    
    // Recalcular valor total da NF
    const novoValorTotal = novosItens.reduce((total, item) => 
      total + parseFloat(item.valorTotal), 0).toFixed(2);
    
    formik.setFieldValue('valorTotal', novoValorTotal);
  };

  // Configuração das colunas da tabela de itens
  const colunas = [
    { field: 'insumoNome', headerName: 'Insumo', flex: 2 },
    { field: 'quantidade', headerName: 'Quantidade', flex: 1 },
    { field: 'valorUnitario', headerName: 'Valor Unitário', flex: 1, valueFormatter: params => `R$ ${params.value}` },
    { field: 'valorTotal', headerName: 'Valor Total', flex: 1, valueFormatter: params => `R$ ${params.value.toFixed(2)}` },
    { 
      field: 'acoes', 
      headerName: 'Ações', 
      flex: 1,
      cellRenderer: params => (
        <IconButton 
          color="error" 
          onClick={() => removerItem(params.data.id)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Nota Fiscal
          </Typography>
          
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {/* Dados da NFe */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  id="numero"
                  name="numero"
                  label="Número da NF"
                  value={formik.values.numero}
                  onChange={formik.handleChange}
                  error={formik.touched.numero && Boolean(formik.errors.numero)}
                  helperText={formik.touched.numero && formik.errors.numero}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  id="serie"
                  name="serie"
                  label="Série"
                  value={formik.values.serie}
                  onChange={formik.handleChange}
                  error={formik.touched.serie && Boolean(formik.errors.serie)}
                  helperText={formik.touched.serie && formik.errors.serie}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Data de Emissão"
                  value={formik.values.dataEmissao}
                  onChange={(value) => formik.setFieldValue('dataEmissao', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.dataEmissao && Boolean(formik.errors.dataEmissao)}
                      helperText={formik.touched.dataEmissao && formik.errors.dataEmissao}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Data de Entrada"
                  value={formik.values.dataEntrada}
                  onChange={(value) => formik.setFieldValue('dataEntrada', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.dataEntrada && Boolean(formik.errors.dataEntrada)}
                      helperText={formik.touched.dataEntrada && formik.errors.dataEntrada}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="fornecedor-label">Fornecedor</InputLabel>
                  <Select
                    labelId="fornecedor-label"
                    id="fornecedorId"
                    name="fornecedorId"
                    value={formik.values.fornecedorId}
                    onChange={formik.handleChange}
                    error={formik.touched.fornecedorId && Boolean(formik.errors.fornecedorId)}
                  >
                    {fornecedores.map(fornecedor => (
                      <MenuItem key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="chaveAcesso"
                  name="chaveAcesso"
                  label="Chave de Acesso"
                  value={formik.values.chaveAcesso}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="observacoes"
                  name="observacoes"
                  label="Observações"
                  multiline
                  rows={2}
                  value={formik.values.observacoes}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              {/* Valores */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Valores
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorTotal"
                  name="valorTotal"
                  label="Valor Total"
                  type="number"
                  InputProps={{ readOnly: true }}
                  value={formik.values.valorTotal}
                  onChange={formik.handleChange}
                  error={formik.touched.valorTotal && Boolean(formik.errors.valorTotal)}
                  helperText={formik.touched.valorTotal && formik.errors.valorTotal}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorIcms"
                  name="valorIcms"
                  label="Valor ICMS"
                  type="number"
                  value={formik.values.valorIcms}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorIpi"
                  name="valorIpi"
                  label="Valor IPI"
                  type="number"
                  value={formik.values.valorIpi}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorFrete"
                  name="valorFrete"
                  label="Valor Frete"
                  type="number"
                  value={formik.values.valorFrete}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorSeguro"
                  name="valorSeguro"
                  label="Valor Seguro"
                  type="number"
                  value={formik.values.valorSeguro}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorDesconto"
                  name="valorDesconto"
                  label="Valor Desconto"
                  type="number"
                  value={formik.values.valorDesconto}
                  onChange={formik.handleChange}
                />
              </Grid>
              
              {/* Itens da NFe */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Itens da Nota Fiscal
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="insumo-label">Insumo</InputLabel>
                  <Select
                    labelId="insumo-label"
                    id="insumoId"
                    name="insumoId"
                    value={itemAtual.insumoId}
                    onChange={handleItemChange}
                  >
                    {insumos.map(insumo => (
                      <MenuItem key={insumo.id} value={insumo.id}>
                        {insumo.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="quantidade"
                  name="quantidade"
                  label="Quantidade"
                  type="number"
                  value={itemAtual.quantidade}
                  onChange={handleItemChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorUnitario"
                  name="valorUnitario"
                  label="Valor Unitário"
                  type="number"
                  value={itemAtual.valorUnitario}
                  onChange={handleItemChange}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id="valorTotal"
                  name="valorTotal"
                  label="Valor Total"
                  type="number"
                  InputProps={{ readOnly: true }}
                  value={itemAtual.valorTotal}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={adicionarItem}
                  sx={{ height: '56px' }}
                >
                  Adicionar
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <div className="ag-theme-material" style={{ height: 300, width: '100%' }}>
                  <AgGridReact
                    rowData={itens}
                    columnDefs={colunas}
                    pagination={true}
                    paginationPageSize={5}
                    domLayout='autoHeight'
                  />
                </div>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    disabled={itens.length === 0}
                  >
                    Salvar Nota Fiscal
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
        
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default CadastroNFe;
