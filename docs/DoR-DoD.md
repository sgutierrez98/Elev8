# Definición de preparado y de terminado — Elev8 Sportswear

Metodología: Scrum con prácticas de XP. Sprints de 2 semanas.
Responsable: Fabián Santiago Gutiérrez (asume los roles de Product Owner, Scrum Master, desarrollador y QA).

## Definition of Ready (DoR)

Un elemento puede entrar al sprint solo si cumple todo esto:

- [ ] Tiene una historia de usuario con criterios de aceptación escritos.
- [ ] Las dependencias y el entorno de prueba están identificados.
- [ ] Están definidas las pruebas que se aplicarán (cuadrantes Q1, Q2 y Q4).
- [ ] Tiene una estimación de esfuerzo en horas.
- [ ] Se identificaron los riesgos de seguridad del elemento.

## Definition of Done (DoD)

Un elemento se cierra (columna **Hecho** del tablero) solo si cumple todo esto:

- [ ] El código está integrado y revisado con la lista de verificación de la rama.
- [ ] Las pruebas unitarias y de integración del elemento pasan.
- [ ] El flujo de integración continua (CI) está en verde.
- [ ] No quedan defectos abiertos de severidad alta.
- [ ] No hay datos personales (como correos) en los registros (logs).
- [ ] `npm audit --audit-level=high` no reporta vulnerabilidades altas ni críticas.
- [ ] La documentación y la bitácora están actualizadas.

## Flujo de trabajo

1. Cada cambio se hace en una rama propia: `feature/<nombre>` o `fix/<nombre>`.
2. Los commits siguen el formato `tipo(alcance): descripción`, por ejemplo `fix(api): responde 400 ante JSON malformado`.
3. Antes de integrar a `master` se revisa la DoD completa.
3. Al cierre del sprint se hace la revisión del incremento y la retrospectiva, y se anota en la bitácora.
