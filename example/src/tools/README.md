# Curriculum MCP Server

Este módulo expone los endpoints de Curriculum como herramientas (tools) de un servidor MCP usando el SDK oficial de Model Context Protocol.

## ¿Qué es MCP?
El Model Context Protocol (MCP) permite exponer datos y acciones para que agentes de inteligencia artificial puedan interactuar con tu aplicación de forma segura y estandarizada, usando "tools" (acciones) y "resources" (datos).

## Estructura
- **curriculumMcpServer.ts**: Implementa el servidor MCP y expone los siguientes tools:
  - `createCurriculum`: Crea un nuevo curriculum.
  - `getCurriculum`: Obtiene un curriculum por ID.
  - `updateCurriculum`: Actualiza un curriculum por ID.
  - `deleteCurriculum`: Elimina un curriculum por ID.

## Instalación de dependencias

Desde la carpeta `example`, ejecuta:

```bash
npm install @modelcontextprotocol/sdk zod
```

## Uso

Puedes ejecutar el servidor MCP por stdio (modo recomendado para integración con agentes LLM):

```bash
npx ts-node src/tools/curriculumMcpServer.ts
```

Esto deja el proceso escuchando comandos MCP por la entrada/salida estándar.

## Ejemplo de uso de tools

Cada tool espera un input específico:

- **createCurriculum**
  - Input: `{ "fullName": string, "content": string }`
  - Output: Curriculum creado (JSON)

- **getCurriculum**
  - Input: `{ "id": number }`
  - Output: Curriculum (JSON) o mensaje de error

- **updateCurriculum**
  - Input: `{ "id": number, "fullName": string, "content": string }`
  - Output: Curriculum actualizado (JSON) o mensaje de error

- **deleteCurriculum**
  - Input: `{ "id": number }`
  - Output: Mensaje de éxito o error

## Integración con agentes LLM

Puedes conectar este MCP Server a cualquier agente o framework compatible con MCP. Consulta la documentación de tu agente para más detalles sobre cómo conectar un servidor MCP por stdio o HTTP.

## Personalización

Puedes agregar más tools siguiendo el patrón de `server.registerTool` en `curriculumMcpServer.ts`.

---

**Repositorio SDK MCP:**
- https://github.com/modelcontextprotocol/typescript-sdk

**Documentación oficial MCP:**
- https://modelcontextprotocol.io
