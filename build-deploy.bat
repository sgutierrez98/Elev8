@echo off
echo ========================================
echo Elev8 Sportswear - Build y Despliegue
echo ========================================

echo.
echo [1/5] Instalando dependencias de React...
cd src\main\frontend
call npm install

echo.
echo [2/5] Compilando React...
call npm run build

echo.
echo [3/5] Compilando proyecto Java...
cd ..\..\..
call mvn clean package

echo.
echo [4/5] Copiando WAR a Tomcat...
copy target\elev8.war "C:\Program Files\Apache Software Foundation\Tomcat 10.0\webapps\"

echo.
echo [5/5] Iniciando servicios...
call start-all.bat

echo.
echo ========================================
echo Despliegue completado!
echo ========================================
echo   - http://localhost:8080/elev8/
echo ========================================
pause