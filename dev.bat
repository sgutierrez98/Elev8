@echo off
echo ========================================
echo Elev8 Sportswear - Modo Desarrollo
echo ========================================

echo.
echo Iniciando React en modo desarrollo...
start cmd /k "cd src\main\frontend && npm start"

echo.
echo Iniciando Tomcat...
start cmd /k "cd C:\Program Files\Apache Software Foundation\Tomcat 10.0\bin && catalina.bat run"

echo.
echo ========================================
echo Servicios iniciados:
echo   - React: http://localhost:3000
echo   - Java Backend: http://localhost:8080/elev8
echo ========================================
pause