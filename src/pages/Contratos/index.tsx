import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { contratosService, cotacoesService } from "../../services/api";

export default function Contratos() {
  const [activeTab, setActiveTab] = useState("contratos");
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Carregar dados com base na aba ativa
        if (activeTab === "contratos") {
          const response = await contratosService.listar();
          setContratos(response.data || []);
        } else if (activeTab === "cotacoes") {
          const response = await cotacoesService.listar();
          setCotacoes(response.data || []);
        }
      } catch (error) {
        console.error(`Erro ao carregar dados de ${activeTab}:`, error);
        
        // Em caso de erro, usar dados mockados para demonstração
        if (activeTab === "contratos") {
          setContratos([
            { id: 1, numero: "CT-2025-001", fornecedor: "Distribuidora Alimentos ABC", inicio: "01/01/2025", fim: "31/12/2025", valor: 145000.00, status: "Ativo" },
            { id: 2, numero: "CT-2025-002", fornecedor: "Hortifruti Express", inicio: "15/01/2025", fim: "14/01/2026", valor: 87500.00, status: "Ativo" },
            { id: 3, numero: "CT-2025-003", fornecedor: "Laticínios Qualidade", inicio: "01/02/2025", fim: "31/01/2026", valor: 112000.00, status: "Ativo" },
            { id: 4, numero: "CT-2024-015", fornecedor: "Carnes Premium", inicio: "01/07/2024", fim: "30/06/2025", valor: 198000.00, status: "Ativo" },
            { id: 5, numero: "CT-2024-012", fornecedor: "Grãos & Cereais Ltda", inicio: "01/05/2024", fim: "30/04/2025", valor: 76500.00, status: "Ativo" },
          ]);
        } else if (activeTab === "cotacoes") {
          setCotacoes([
            { id: 1, insumo: "Arroz Branco", fornecedor: "Distribuidora Alimentos ABC", data: "10/05/2025", valor: 4.75, validade: "10/06/2025" },
            { id: 2, insumo: "Arroz Branco", fornecedor: "Grãos & Cereais Ltda", data: "10/05/2025", valor: 4.90, validade: "10/06/2025" },
            { id: 3, insumo: "Feijão Carioca", fornecedor: "Distribuidora Alimentos ABC", data: "10/05/2025", valor: 7.50, validade: "10/06/2025" },
            { id: 4, insumo: "Feijão Carioca", fornecedor: "Grãos & Cereais Ltda", data: "10/05/2025", valor: 7.25, validade: "10/06/2025" },
            { id: 5, insumo: "Peito de Frango", fornecedor: "Carnes Premium", data: "12/05/2025", valor: 18.90, validade: "12/06/2025" },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);

  // Função para filtrar dados com base no termo de busca
  const filteredData = (data) => {
    if (!searchTerm) return data;
    
    return data.filter(item => 
      Object.values(item).some(
        value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contratos e Cotações</h1>
        <p className="text-muted-foreground">
          Gerencie contratos com fornecedores e acompanhe cotações de preços.
        </p>
      </div>

      <Tabs defaultValue="contratos" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="contratos" className="flex items-center gap-2">
            <FileContract size={16} />
            <span>Contratos</span>
          </TabsTrigger>
          <TabsTrigger value="cotacoes" className="flex items-center gap-2">
            <BarChart size={16} />
            <span>Cotações</span>
          </TabsTrigger>
          <TabsTrigger value="cronograma" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Cronograma</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Contratos */}
        <TabsContent value="contratos" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Contratos</CardTitle>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Novo Contrato</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar contratos..."
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
                      <TableHead>Número</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Início</TableHead>
                      <TableHead>Término</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(contratos).length > 0 ? (
                      filteredData(contratos).map((contrato) => (
                        <TableRow key={contrato.id}>
                          <TableCell>{contrato.numero}</TableCell>
                          <TableCell>{contrato.fornecedor}</TableCell>
                          <TableCell>{contrato.inicio}</TableCell>
                          <TableCell>{contrato.fim}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrato.valor)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={contrato.status === "Ativo" ? "success" : "secondary"}>
                              {contrato.status}
                            </Badge>
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
                        <TableCell colSpan={7} className="text-center py-4">Nenhum contrato encontrado</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Cotações */}
        <TabsContent value="cotacoes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Cotações</CardTitle>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Nova Cotação</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar cotações..."
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
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Valor Unitário</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(cotacoes).length > 0 ? (
                      filteredData(cotacoes).map((cotacao) => (
                        <TableRow key={cotacao.id}>
                          <TableCell>{cotacao.insumo}</TableCell>
                          <TableCell>{cotacao.fornecedor}</TableCell>
                          <TableCell>{cotacao.data}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cotacao.valor)}
                          </TableCell>
                          <TableCell>{cotacao.validade}</TableCell>
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
                        <TableCell colSpan={6} className="text-center py-4">Nenhuma cotação encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Cronograma */}
        <TabsContent value="cronograma" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <p className="text-muted-foreground mb-2">Selecione um contrato para visualizar o cronograma de entregas</p>
                <div className="flex justify-center gap-2">
                  <select className="border rounded p-2 w-full max-w-md">
                    <option value="">Selecione um contrato</option>
                    {contratos.map(contrato => (
                      <option key={contrato.id} value={contrato.id}>
                        {contrato.numero} - {contrato.fornecedor}
                      </option>
                    ))}
                  </select>
                  <Button>Visualizar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
