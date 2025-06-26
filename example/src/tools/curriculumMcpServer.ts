import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { CurriculumService } from '../services/CurriculumService';
import { SqliteCurriculumRepository } from '../repositories/SqliteCurriculumRepository';
import { CurriculumDTO } from '../models/CurriculumDTO';

// Instanciar el servicio como en el controller
const repository = new SqliteCurriculumRepository();
const service = new CurriculumService(repository);

const server = new McpServer({
  name: 'curriculum-mcp',
  version: '1.0.0',
});

// Tool: Crear curriculum
server.registerTool(
  'createCurriculum',
  {
    title: 'Crear Curriculum',
    description: 'Crea un nuevo curriculum',
    inputSchema: {
      fullName: z.string(),
      content: z.string(),
    },
  },
  async ({ fullName, content }) => {
    const curriculum = await service.createCurriculum({ fullName, content });
    return {
      content: [{ type: 'text', text: JSON.stringify(curriculum) }],
    };
  }
);

// Tool: Obtener curriculum por id
server.registerTool(
  'getCurriculum',
  {
    title: 'Obtener Curriculum',
    description: 'Obtiene un curriculum por id',
    inputSchema: { id: z.number() },
  },
  async ({ id }) => {
    const curriculum = await service.getCurriculum(id);
    if (!curriculum) {
      return {
        content: [{ type: 'text', text: 'Curriculum no encontrado' }],
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(curriculum) }],
    };
  }
);

// Tool: Actualizar curriculum
server.registerTool(
  'updateCurriculum',
  {
    title: 'Actualizar Curriculum',
    description: 'Actualiza un curriculum por id',
    inputSchema: { id: z.number(), fullName: z.string(), content: z.string() },
  },
  async ({ id, fullName, content }) => {
    const updated = await service.updateCurriculum(id, { fullName, content });
    if (!updated) {
      return {
        content: [{ type: 'text', text: 'Curriculum no encontrado' }],
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(updated) }],
    };
  }
);

// Tool: Eliminar curriculum
server.registerTool(
  'deleteCurriculum',
  {
    title: 'Eliminar Curriculum',
    description: 'Elimina un curriculum por id',
    inputSchema: { id: z.number() },
  },
  async ({ id }) => {
    const deleted = await service.deleteCurriculum(id);
    if (!deleted) {
      return {
        content: [{ type: 'text', text: 'Curriculum no encontrado' }],
      };
    }
    return {
      content: [{ type: 'text', text: 'Curriculum eliminado' }],
    };
  }
);

// Iniciar el servidor MCP por stdio
export async function startMcpServer() {
  const transport = new StdioServerTransport();
  console.log("Conectado!");
  await server.connect(transport);
}

// Si se ejecuta directamente, iniciar el servidor
if (require.main === module) {
  startMcpServer();
}
