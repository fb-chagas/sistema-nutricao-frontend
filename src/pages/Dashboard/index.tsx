import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { dashboardService } from "@/services/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    contratosAtivos: 0,
    custoMedioMensal: 0,
    entregasPendentes: 0,
    fornecedoresAtivos: 0,
    custoMensalData: [],
    entregasData: []
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Obter dados do dashboard do backend
        const [resumoRes, indicadoresRes, graficosRes] = await Promise.all([
          dashboardService.obterResumo(),
          dashboardService.obterIndicadores(),
          dashboardService.obterGraficos()
        ]);
        
        // Processar os dados recebidos
        setDashboardData({
          contratosAtivos: indicadoresRes.data.contratosAtivos || 0,
          custoMedioMensal: indicadoresRes.data.custoMedioMensal || 0,
          entregasPendentes: indicadoresRes.data.entregasPendentes || 0,
          fornecedoresAtivos: indicadoresRes.data.fornecedoresAtivos || 0,
          custoMensalData: graficosRes.data.custoMensalData || [],
          entregasData: graficosRes.data.entregasData || []
        });
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        // Em caso de erro, usar dados mockados para demonstração
        setDashboardData({
          contratosAtivos: 12,
          custoMedioMensal: 15200,
          entregasPendentes: 8,
          fornecedoresAtivos: 24,
          custoMensalData: [
            { mes: 'Jan', custo: 12400 },
            { mes: 'Fev', custo: 13100 },
            { mes: 'Mar', custo: 14500 },
            { mes: 'Abr', custo: 13800 },
            { mes: 'Mai', custo: 15200 },
            { mes: 'Jun', custo: 16100 },
          ],
          entregasData: [
            { mes: 'Jan', previsto: 45, realizado: 42 },
            { mes: 'Fev', previsto: 50, realizado: 48 },
            { mes: 'Mar', previsto: 55, realizado: 53 },
            { mes: 'Abr', previsto: 48, realizado: 47 },
            { mes: 'Mai', previsto: 52, realizado: 50 },
            { mes: 'Jun', previsto: 58, realizado: 55 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema de nutrição com indicadores e gráficos importantes.
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contratos Ativos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 18V6m-8 6v6" />
              <path d="M12 6v12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.contratosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Custo Médio Mensal
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dashboardData.custoMedioMensal)}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Entregas Pendentes
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.entregasPendentes}</div>
            <p className="text-xs text-muted-foreground">
              -2 desde ontem
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fornecedores Ativos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.fornecedoresAtivos}</div>
            <p className="text-xs text-muted-foreground">
              +3 desde o último mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Custos Mensais</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">Carregando...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.custoMensalData}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Custo']}
                  />
                  <Bar dataKey="custo" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Entregas Previstas vs. Realizadas</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">Carregando...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.entregasData}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="previsto" stroke="#8884d8" />
                  <Line type="monotone" dataKey="realizado" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="mr-3 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div>
                <p className="font-medium">3 contratos vencem nos próximos 30 dias</p>
                <p className="text-sm text-gray-600">Verifique a seção de contratos para mais detalhes</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="mr-3 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <p className="font-medium">Fechamento mensal pendente</p>
                <p className="text-sm text-gray-600">O fechamento do mês anterior ainda não foi realizado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
