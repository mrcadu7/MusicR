#!/usr/bin/env pwsh

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " MUSICR - Iniciando Ambiente de Dev" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mata processos existentes
Write-Host "[0/3] Limpando processos existentes..." -ForegroundColor Yellow
Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Inicia Django
Write-Host "[1/3] Iniciando Django com auto-reload..." -ForegroundColor Green
Set-Location "musicr"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python manage.py runserver --settings=musicr.settings" -WindowStyle Normal

# Aguarda um pouco
Write-Host "[2/3] Aguardando Django inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Inicia Frontend
Write-Host "[3/3] Iniciando Webpack com hot reload..." -ForegroundColor Green
Set-Location "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Servidores iniciados com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host " Django: http://127.0.0.1:8000" -ForegroundColor White
Write-Host " Frontend: Auto-reload ativo" -ForegroundColor White
Write-Host ""
Write-Host " Para parar: feche ambas as janelas" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green

# Volta para o diretório raiz
Set-Location ".."

Read-Host "Pressione Enter para sair"
