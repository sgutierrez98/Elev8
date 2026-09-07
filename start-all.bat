@echo off
echo ========================================
echo Elev8 Sportswear - Inicio de Servicios
echo ========================================

echo.
echo [1/4] Iniciando PostgreSQL...
net start postgresql-x64-15

echo.
echo [2/4] Iniciando MongoDB...
net start MongoDB

echo.
echo [3/4] Iniciando Tomcat...
cd "C:\Program Files\Apache Software Foundation\Tomcat 10.0\bin"
start catalina.bat run

echo.
echo [4/4] Iniciando API Node.js...
cd D:\Descargas\SENA\Elev8\api
start cmd /k "npm run dev"

echo.
echo ========================================
echo Servicios iniciados:
echo   - PostgreSQL: http://localhost:5432
echo   - MongoDB: http://localhost:27017
echo   - Tomcat: http://localhost:8080/elev8/
echo   - API Node.js: http://localhost:5000
echo   - React (desarrollo): http://localhost:3000
echo ========================================
pause