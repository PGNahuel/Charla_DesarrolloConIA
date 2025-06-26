# Curriculum Vitae CRUD (Express + TypeScript + SQLite)

Este proyecto es una aplicación CRUD para gestionar currículums vitae (CV) de personas, desarrollada en TypeScript usando Express y SQLite. Incluye un frontend básico integrado.

## Requisitos
- Node.js >= 18

## Instalación
```bash
cd example
npm install
```

## Ejecución en desarrollo
```bash
npm run dev
```

## Compilar y ejecutar en producción
```bash
npm run build
npm start
```

La base de datos SQLite se crea automáticamente como `curriculum.db` en la raíz del proyecto.

## Estructura del proyecto
- `src/` - Código fuente (backend y frontend)
- `curriculum.db` - Base de datos SQLite

## Endpoints principales
- `POST   /api/curriculums`   - Crear currículum
- `GET    /api/curriculums/:id` - Leer currículum
- `PUT    /api/curriculums/:id` - Actualizar currículum
- `DELETE /api/curriculums/:id` - Borrar currículum

El frontend básico está disponible en la raíz (`/`).

---

**Principios SOLID respetados**: El código está modularizado en controladores, servicios, repositorios e interfaces para facilitar futuras extensiones y cambios de fuente de datos.
