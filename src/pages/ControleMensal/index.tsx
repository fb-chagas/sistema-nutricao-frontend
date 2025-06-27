import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Calendar, Plus, Search, Edit, Trash2, Eye, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { controleMensalService } from "../../services/api";

export default function ControleMensal() {
  const [mesSelecionado, setMesSelecionado] = useState("5");
  const [anoSelecionado, setAnoSelecionado] = useState("2025");
  const [loading, setLoading] = useState(true);
  const [registrosMensais, setRegistrosMensais] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const meses = [
    { valor: "1", nome: "Janeiro" },
    { valor: "2", nome: "Fevereiro" },
    { valor: "3", nome: "Março" },
    { valor: "4", nome: "Abril" },
    { valor: "5", nome: "Maio" },
    { valor: "6", nome: "Junho" },
    { valor: "7", nome: "Julho" },
    { valor: "8", nome: "Agosto" },
    { valor: "9", nome: "Setembro" },
    { valor: "10", nome: "Outubro" },
    { valor: "11", nome: "Novembro" },
    { valor: "12", nome: "Dezembro" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Carregar dados do período selecionado
        const [registrosRes, estoqueRes] = await Promise.all([
          controleMensalService.listarRegistros(mesSelecionado, anoSelecionado),
          controleMensalService.obterEstoque(mesSelecionado, anoSelecionado)
        ]);
        
        setRegistrosMensais(registrosRes.data || []);
        setEstoque(estoqueRes.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados de controle mensal:", error);
        
        // Em caso de erro, usar dados mockados para demonstração
        setRegistrosMensais([
          { id: 1, data: "02/05/2025", insumo: "Arroz Branco", fornecedor: "Distribuidora Alimentos ABC", quantidade: 250, unidade: "kg", valor: 1187.50 },
          { id: 2, data: "05/05/2025", insumo: "Feijão Carioca", fornecedor: "Grãos & Cereais Ltda", quantidade: 150, unidade: "kg", valor: 1087.50 },
          { id: 3, data: "08/05/2025", insumo: "Peito de Frango", fornecedor: "Carnes Premium", quantidade: 120, unidade: "kg", valor: 2268.00 },
          { id: 4, data: "12/05/2025", insumo: "Leite Integral", fornecedor: "Laticínios Qualidade", quantidade: 300, unidade: "L", valor: 1350.00 },
          { id: 5, data: "15/05/2025", insumo: "Alface Crespa", fornecedor: "Hortifruti Express", quantidade: 100, unidade: "unid", valor: 350.00 },
        ]);
        
        setEstoque([
          { id: 1, insumo: "Arroz Branco", quantidade: 180, unidade: "kg", valorMedio: 4.75 },
          { id: 2, insumo: "Feijão Carioca", quantidade: 95, unidade: "kg", valorMedio: 7.25 },
          { id: 3, insumo: "Peito de Frango", quantidade: 65, unidade: "kg", valorMedio: 18.90 },
          { id: 4, insumo: "Leite Integral", quantidade: 120, unidade: "L", valorMedio: 4.50 },
          { id: 5, insumo: "Alface Crespa", quantidade: 25, unidade: "unid", valorMedio: 3.50 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [mesSelecionado, anoSelecionado]);

  // Função para filtrar dados com base no termo de busca
  const filteredData = (data) => {
    if (!searchTerm) return data;
    
    return data.filter(item => 
      Object.values(item).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Função para atualizar os dados quando o período for alterado
  const handleVisualizarPeriodo = () => {
    setLoading(true);
    // Recarregar dados com o período selecionado
    const fetchData = async () => {
      try {
        const [registrosRes, estoqueRes] = await Promise.all([
          controleMensalService.listarRegistros(mesSelecionado, anoSelecionado),
          controleMensalService.obterEstoque(mesSelecionado, anoSelecionado)
        ]);
        
        setRegistrosMensais(registrosRes.data || []);
        setEstoque(estoqueRes.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do período:", error);
        // Manter os dados mockados em caso de erro
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Controle Mensal</h1>
        <p className="text-muted-foreground">
          Registre e visualize entregas mensais, controle estoque e acompanhe pagamentos.
        </p>
      </div>

      {/* Seletor de período */}
      <Card>
        <CardHeader>
          <CardTitle>Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Mês</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.valor} value={mes.valor}>
                      {mes.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium mb-1">Ano</label>
              <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="mb-0.5" onClick={handleVisualizarPeriodo}>
                <Calendar className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registros Mensais */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>
            Registros de Entregas - {meses.find(m => m.valor === mesSelecionado)?.nome}/{anoSelecionado}
          </CardTitle>
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Nova Entrega</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar registros..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Insumo</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">Carregando...</TableCell>
                  </TableRow>
                ) : filteredData(registrosMensais).length > 0 ? (
                  filteredData(registrosMensais).map((registro) => (
                    <TableRow key={registro.id}>
                      <TableCell>{registro.data}</TableCell>
                      <TableCell>{registro.insumo}</TableCell>
                      <TableCell>{registro.fornecedor}</TableCell>
                      <TableCell className="text-right">
                        {registro.quantidade} {registro.unidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(registro.valor)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">Nenhum registro encontrado</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Estoque Atual */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Estoque Atual</CardTitle>
          <Button variant="outline" className="flex items-center gap-1">
            <Check size={16} />
            <span>Atualizar Estoque</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Insumo</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Valor Médio</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">Carregando...</TableCell>
                  </TableRow>
                ) : estoque.length > 0 ? (
                  estoque.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.insumo}</TableCell>
                      <TableCell className="text-right">
                        {item.quantidade} {item.unidade}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorMedio)}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.quantidade * item.valorMedio)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.quantidade > 50 ? "success" : item.quantidade > 20 ? "warning" : "destructive"}>
                          {item.quantidade > 50 ? "Normal" : item.quantidade > 20 ? "Baixo" : "Crítico"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">Nenhum item em estoque</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
