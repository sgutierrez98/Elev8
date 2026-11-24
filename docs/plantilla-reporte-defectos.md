# Plantilla de reporte de defectos — Elev8 Sportswear

Un reporte por cada defecto confirmado. Estructura tomada del componente "Aplicación de pruebas de software".

| Campo | Contenido |
|---|---|
| Identificador | |
| Título | |
| Reportado por | |
| Asignado a | |
| Fecha de creación | |
| Severidad | Alta / Media / Baja |
| Nombre de la aplicación | Elev8 API (Node.js / Express) |
| Descripción | |
| Método de reproducción | |
| Información adicional | Resultado esperado, cambio asociado (RC-xx) y evidencia de verificación |

## Ciclo de vida de una incidencia

Nuevo → Abierto → Asignado → Volver a probar → Verificado → Cerrado

Estados especiales: **Diferido** (aplica, pero es de bajo impacto) y **Reabierto** (se corrigió, pero la prueba aún falla).

| Estado | Significado | Quién lo cambia |
|---|---|---|
| Nuevo | El defecto se identifica y se registra | QA |
| Abierto | El equipo de desarrollo lo toma y lo analiza | Desarrollo |
| Asignado | Se asigna a quien lo corregirá | Scrum Master |
| Diferido | Aplica, pero es de bajo impacto y se pospone | Product Owner |
| Reabierto | Se corrigió, pero la prueba aún falla | QA |
| Verificado | La reprueba y la regresión fueron positivas | QA |
| Cerrado | Verificación final aprobada en la revisión del sprint | Product Owner |
