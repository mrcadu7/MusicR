@echo off
echo ========================================
echo  MUSICR - Iniciando Ambiente de Dev
echo ========================================
echo.

REM Mata processos existentes se houver
taskkill /F /IM "python.exe" /T >nul 2>&1
taskkill /F /IM "node.exe" /T >nul 2>&1

echo [1/3] Iniciando Django com auto-reload...
cd musicr
start "Django Server" cmd /k "python manage.py runserver --settings=musicr.settings"

echo [2/3] Aguardando Django inicializar...
timeout /t 3 /nobreak >nul

echo [3/3] Iniciando Webpack com hot reload...
cd frontend
start "Webpack Watch" cmd /k "npm run dev"

echo.
echo ========================================
echo  Servidores iniciados com sucesso!
echo ========================================
echo  Django: http://127.0.0.1:8000
echo  Frontend: Auto-reload ativo
echo.
echo  Para parar: feche ambas as janelas
echo ========================================

pause
