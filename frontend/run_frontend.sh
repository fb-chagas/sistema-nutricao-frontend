#!/bin/bash

# Script para iniciar o frontend do Sistema de Nutrição

echo "Iniciando o frontend do Sistema de Nutrição..."

# Instalar dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

# Iniciar o servidor de desenvolvimento
echo "Iniciando servidor de desenvolvimento React..."
npm start
