@echo off
echo ========================================
echo Elev8 Sportswear - Detener Servicios
echo ========================================

echo.
echo [1/4] Deteniendo Tomcat...
taskkill /F /IM java.exe

echo.
echo [2/4] Deteniendo Node.js...
taskkill /F /IM node.exe

echo.
echo [3/4] Deteniendo MongoDB...
net stop MongoDB

echo.
echo [4/4] Deteniendo PostgreSQL...
net stop postgresql-x64-15

echo.
echo ========================================
echo Todos los servicios detenidos.
echo ========================================
pause