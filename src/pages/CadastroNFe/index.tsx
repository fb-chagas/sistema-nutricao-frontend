import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { FileText, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { fornecedoresService, insumosService, nfeService } from "../../services/api";

export default function CadastroNFe() {
  const [activeTab, setActiveTab] = useState("nfes");
  const [loading, setLoading] = useState(true);
  const [fornecedores, setFornecedores] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [nfes, setNfes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Carregar dados com base na aba ativa
        if (activeTab === "fornecedores") {
          const response = await fornecedoresService.listar();
          setFornecedores(response.data || []);
        } else if (activeTab === "insumos") {
          const response = await insumosService.listar();
          setInsumos(response.data || []);
        } else if (activeTab === "nfes") {
          const response = await nfeService.listar();
          setNfes(response.data || []);
        }
      } catch (error) {
        console.error(`Erro ao carregar dados de ${activeTab}:`, error);
        
        // Em caso de erro, usar dados mockados para demonstração
        if (activeTab === "fornecedores") {
          setFornecedores([
            { id: 1, nome: "Distribuidora Alimentos ABC", cnpj: "12.345.678/0001-90", telefone: "(11) 3456-7890", email: "contato@alimentosabc.com.br" },
            { id: 2, nome: "Hortifruti Express", cnpj: "23.456.789/0001-01", telefone: "(11) 4567-8901", email: "vendas@hortifrutiexpress.com.br" },
            { id: 3, nome: "Laticínios Qualidade", cnpj: "34.567.890/0001-12", telefone: "(11) 5678-9012", email: "comercial@laticiniosqualidade.com.br" },
            { id: 4, nome: "Carnes Premium", cnpj: "45.678.901/0001-23", telefone: "(11) 6789-0123", email: "vendas@carnespremium.com.br" },
            { id: 5, nome: "Grãos & Cereais Ltda", cnpj: "56.789.012/0001-34", telefone: "(11) 7890-1234", email: "contato@graosecereais.com.br" },
          ]);
        } else if (activeTab === "insumos") {
          setInsumos([
            { id: 1, nome: "Arroz Branco", codigo: "ARR001", categoria: "Cereais", unidade: "kg" },
            { id: 2, nome: "Feijão Carioca", codigo: "FEI001", categoria: "Leguminosas", unidade: "kg" },
            { id: 3, nome: "Peito de Frango", codigo: "CAR001", categoria: "Carnes", unidade: "kg" },
            { id: 4, nome: "Leite Integral", codigo: "LAT001", categoria: "Laticínios", unidade: "L" },
            { id: 5, nome: "Alface Crespa", codigo: "HOR001", categoria: "Hortaliças", unidade: "unid" },
          ]);
        } else if (activeTab === "nfes") {
          setNfes([
            { id: 1, numero: "12345", fornecedor: "Distribuidora Alimentos ABC", data: "15/05/2025", valor: 2450.75 },
            { id: 2, numero: "12346", fornecedor: "Hortifruti Express", data: "16/05/2025", valor: 1875.30 },
            { id: 3, numero: "12347", fornecedor: "Laticínios Qualidade", data: "18/05/2025", valor: 3210.45 },
            { id: 4, numero: "12348", fornecedor: "Carnes Premium", data: "20/05/2025", valor: 4560.80 },
            { id: 5, numero: "12349", fornecedor: "Grãos & Cereais Ltda", data: "22/05/2025", valor: 1980.25 },
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
        <h1 className="text-2xl font-bold tracking-tight">Cadastro NFe</h1>
        <p className="text-muted-foreground">
          Gerencie notas fiscais, fornecedores e insumos do sistema.
        </p>
      </div>

      <Tabs defaultValue="nfes" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="nfes" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Notas Fiscais</span>
          </TabsTrigger>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="insumos">Insumos</TabsTrigger>
        </TabsList>

        {/* Tab de Notas Fiscais */}
        <TabsContent value="nfes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Notas Fiscais</CardTitle>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Nova NFe</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar notas fiscais..."
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
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(nfes).length > 0 ? (
                      filteredData(nfes).map((nfe) => (
                        <TableRow key={nfe.id}>
                          <TableCell>{nfe.numero}</TableCell>
                          <TableCell>{nfe.fornecedor}</TableCell>
                          <TableCell>{nfe.data}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nfe.valor)}
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
                        <TableCell colSpan={5} className="text-center py-4">Nenhuma nota fiscal encontrada</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Fornecedores */}
        <TabsContent value="fornecedores" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Fornecedores</CardTitle>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Novo Fornecedor</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar fornecedores..."
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
                      <TableHead>Nome</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(fornecedores).length > 0 ? (
                      filteredData(fornecedores).map((fornecedor) => (
                        <TableRow key={fornecedor.id}>
                          <TableCell>{fornecedor.nome}</TableCell>
                          <TableCell>{fornecedor.cnpj}</TableCell>
                          <TableCell>{fornecedor.telefone}</TableCell>
                          <TableCell>{fornecedor.email}</TableCell>
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
                        <TableCell colSpan={5} className="text-center py-4">Nenhum fornecedor encontrado</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Insumos */}
        <TabsContent value="insumos" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Insumos</CardTitle>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Novo Insumo</span>
              </Button>
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Unidade</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">Carregando...</TableCell>
                      </TableRow>
                    ) : filteredData(insumos).length > 0 ? (
                      filteredData(insumos).map((insumo) => (
                        <TableRow key={insumo.id}>
                          <TableCell>{insumo.nome}</TableCell>
                          <TableCell>{insumo.codigo}</TableCell>
                          <TableCell>{insumo.categoria}</TableCell>
                          <TableCell>{insumo.unidade}</TableCell>
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
                        <TableCell colSpan={5} className="text-center py-4">Nenhum insumo encontrado</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
