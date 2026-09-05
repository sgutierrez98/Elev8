@echo off
echo ========================================
echo Elev8 Sportswear - Build completo
echo ========================================

echo.
echo [1/4] Instalando dependencias de React...
cd src\main\frontend
call npm install

echo.
echo [2/4] Compilando React para producción...
call npm run build

echo.
echo [3/4] Copiando build a webapp...
xcopy /E /I build ..\webapp\react

echo.
echo [4/4] Compilando proyecto Java con Maven...
cd ..\..\..
call mvn clean package

echo.
echo ========================================
echo ✅ Build completado!
echo ========================================
echo El WAR se encuentra en: target\elev8.war
pause