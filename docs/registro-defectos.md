# Registro de defectos — Verificación del 09/11/2026 (evidencia AA2-EV01)

Resultado de la verificación: 25 casos ejecutados, 17 exitosos, 7 fallidos, 1 bloqueado (PC-04). Calificación ponderada: 67,2 / 100 (no aprobado).

Roles: reportado por QA y asignado a desarrollo (Fabián Santiago Gutiérrez). Fecha de creación: 09/11/2026.

| ID interno | ID y severidad en el informe AA2-EV01 | Defecto | Cambio | Estado |
|---|---|---|---|---|
| RD-01 | (completar) | Sin límite de peticiones (rate limiting) | RC-07 | Verificado |
| RD-02 | (completar) | Dependencias con vulnerabilidades conocidas | RC-10 | Verificado |
| RD-03 | (completar) | JSON malformado responde error 500 | RC-08 | Verificado |
| RD-04 | (completar) | Cuerpo de petición muy grande responde error 500 | RC-08 | Verificado |
| RD-05 | (completar) | Sin cabeceras de seguridad (helmet) | RC-06 | Verificado |
| RD-06 | (completar) | Correos electrónicos visibles en los registros (logs) | RC-09 | Verificado |
| RD-07 | (completar) | Cabecera X-Powered-By expuesta | RC-06 | Verificado |

## Evidencia de verificación (24/11/2026)

| ID interno | Cómo se verificó |
|---|---|
| RD-01 | Prueba automática: más de 10 intentos de login devuelven 429 (CI #3 en verde) |
| RD-02 | `npm audit`: de 12 vulnerabilidades (2 críticas, 6 altas) a 2 moderadas solo de desarrollo; `npm audit --audit-level=high` sin errores (commit 2012455) |
| RD-03 | Prueba automática: JSON malformado devuelve 400 (CI #3 en verde) |
| RD-04 | Prueba automática: cuerpo de más de 100 kb devuelve 413 (CI #3 en verde) |
| RD-05 | Prueba automática: cabecera `x-content-type-options: nosniff` y `strict-transport-security` presentes (CI #3 en verde) |
| RD-06 | Commit 1ca57a3 (correo enmascarado); la salida de las pruebas muestra `t***@elev8.com` |
| RD-07 | Prueba automática: la respuesta no incluye `X-Powered-By` (CI #3 en verde) |

## Pendiente

- Caso PC-04 (prueba de carga): ejecución en el flujo `carga.yml`; resultado por registrar.
- Cierre de los defectos (Verificado → Cerrado) tras la reprueba general al cierre del sprint 2.
