import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { BarChart4, FileText, Download, Search, Calculator, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { fechamentoService } from "../../services/api";

export default function Fechamento() {
  const [mesSelecionado, setMesSelecionado] = useState("5");
  const [anoSelecionado, setAnoSelecionado] = useState("2025");
  const [loading, setLoading] = useState(true);
  const [custoMedio, setCustoMedio] = useState([]);
  const [evolucaoCustos, setEvolucaoCustos] = useState([]);
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
        const custoMedioRes = await fechamentoService.obterCustoMedio(mesSelecionado, anoSelecionado);
        setCustoMedio(custoMedioRes.data || []);
        
        // Carregar dados de tendências para o gráfico de evolução
        const tendenciasRes = await fechamentoService.obterTendencias();
        setEvolucaoCustos(tendenciasRes.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados de fechamento:", error);
        
        // Em caso de erro, usar dados mockados para demonstração
        setCustoMedio([
          { id: 1, insumo: "Arroz Branco", quantidade: 750, unidade: "kg", valorTotal: 3562.50, custoMedio: 4.75 },
          { id: 2, insumo: "Feijão Carioca", quantidade: 450, unidade: "kg", valorTotal: 3262.50, custoMedio: 7.25 },
          { id: 3, insumo: "Peito de Frango", quantidade: 380, unidade: "kg", valorTotal: 7182.00, custoMedio: 18.90 },
          { id: 4, insumo: "Leite Integral", quantidade: 900, unidade: "L", valorTotal: 4050.00, custoMedio: 4.50 },
          { id: 5, insumo: "Alface Crespa", quantidade: 320, unidade: "unid", valorTotal: 1120.00, custoMedio: 3.50 },
        ]);
        
        setEvolucaoCustos([
          { insumo: "Arroz", jan: 4.50, fev: 4.55, mar: 4.60, abr: 4.70, mai: 4.75 },
          { insumo: "Feijão", jan: 6.80, fev: 6.90, mar: 7.10, abr: 7.20, mai: 7.25 },
          { insumo: "Frango", jan: 17.50, fev: 17.80, mar: 18.20, abr: 18.50, mai: 18.90 },
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

  // Função para calcular o fechamento
  const handleCalcularFechamento = () => {
    setLoading(true);
    // Recarregar dados com o período selecionado
    const fetchData = async () => {
      try {
        const custoMedioRes = await fechamentoService.obterCustoMedio(mesSelecionado, anoSelecionado);
        setCustoMedio(custoMedioRes.data || []);
      } catch (error) {
        console.error("Erro ao calcular fechamento:", error);
        // Manter os dados mockados em caso de erro
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  };

  // Função para exportar relatório
  const handleExportarRelatorio = async (tipo) => {
    try {
      const response = await fechamentoService.exportarRelatorio(tipo, mesSelecionado, anoSelecionado);
      
      // Criar um objeto URL para o blob recebido
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Definir o nome do arquivo baseado no tipo e período
      const mesNome = meses.find(m => m.valor === mesSelecionado)?.nome;
      link.setAttribute('download', `${tipo}_${mesNome}_${anoSelecionado}.pdf`);
      
      // Simular clique para iniciar o download
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Erro ao exportar relatório ${tipo}:`, error);
      alert(`Não foi possível exportar o relatório. Tente novamente mais tarde.`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fechamento e Análise</h1>
        <p className="text-muted-foreground">
          Calcule custos médios, gere relatórios e analise tendências.
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
              <Button className="mb-0.5" onClick={handleCalcularFechamento}>
                <Calculator className="mr-2 h-4 w-4" />
                Calcular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="custo-medio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="custo-medio" className="flex items-center gap-2">
            <Calculator size={16} />
            <span>Custo Médio</span>
          </TabsTrigger>
          <TabsTrigger value="evolucao" className="flex items-center gap-2">
            <BarChart4 size={16} />
            <span>Evolução de Custos</span>
          </TabsTrigger>
          <TabsTrigger value="relatorios" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Relatórios</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Custo Médio */}
        <TabsContent value="custo-medio" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>
                Custo Médio por Insumo - {meses.find(m => m.valor === mesSelecionado)?.nome}/{anoSelecionado}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={() => handleExportarRelatorio('custo-medio')}
                >
                  <Download size={16} />
                  <span>Exportar</span>
                </Button>
                <Button className="flex items-center gap-1">
                  <Check size={16} />
                  <span>Finalizar Fechamento</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar insumos..."
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
                      <TableHead>Insumo</TableHead>
                      <TableHead className="text-right">Quantidade Total</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead className="text-right">Custo Médio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(custoMedio).length > 0 ? (
                      filteredData(custoMedio).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.insumo}</TableCell>
                          <TableCell className="text-right">
                            {item.quantidade} {item.unidade}
                          </TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorTotal)}
                          </TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.custoMedio)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">Nenhum dado encontrado</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Evolução de Custos */}
        <TabsContent value="evolucao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Custos - 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select defaultValue="arroz">
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Selecione um insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arroz">Arroz Branco</SelectItem>
                    <SelectItem value="feijao">Feijão Carioca</SelectItem>
                    <SelectItem value="frango">Peito de Frango</SelectItem>
                    <SelectItem value="leite">Leite Integral</SelectItem>
                    <SelectItem value="alface">Alface Crespa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-[400px]">Carregando...</div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={evolucaoCustos}>
                    <XAxis dataKey="insumo" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Valor']} />
                    <Legend />
                    <Bar dataKey="jan" name="Janeiro" fill="#8884d8" />
                    <Bar dataKey="fev" name="Fevereiro" fill="#82ca9d" />
                    <Bar dataKey="mar" name="Março" fill="#ffc658" />
                    <Bar dataKey="abr" name="Abril" fill="#ff8042" />
                    <Bar dataKey="mai" name="Maio" fill="#0088fe" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Relatórios */}
        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Relatório de Custo Médio</h3>
                    <p className="text-sm text-muted-foreground">Detalhamento dos custos médios por insumo no período selecionado</p>
                  </div>
                  <Button 
                    className="flex items-center gap-1"
                    onClick={() => handleExportarRelatorio('custo-medio')}
                  >
                    <Download size={16} />
                    <span>Exportar PDF</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Relatório de Evolução de Custos</h3>
                    <p className="text-sm text-muted-foreground">Análise comparativa da evolução dos custos nos últimos meses</p>
                  </div>
                  <Button 
                    className="flex items-center gap-1"
                    onClick={() => handleExportarRelatorio('evolucao')}
                  >
                    <Download size={16} />
                    <span>Exportar PDF</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Relatório de Fechamento Mensal</h3>
                    <p className="text-sm text-muted-foreground">Resumo completo do fechamento do mês selecionado</p>
                  </div>
                  <Button 
                    className="flex items-center gap-1"
                    onClick={() => handleExportarRelatorio('fechamento')}
                  >
                    <Download size={16} />
                    <span>Exportar PDF</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Planilha de Dados</h3>
                    <p className="text-sm text-muted-foreground">Exportação dos dados brutos para análise em Excel</p>
                  </div>
                  <Button 
                    className="flex items-center gap-1"
                    onClick={() => handleExportarRelatorio('excel')}
                  >
                    <Download size={16} />
                    <span>Exportar Excel</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
