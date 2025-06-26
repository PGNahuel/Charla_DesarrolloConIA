import { Request, Response } from 'express';
import { CurriculumService } from '../services/CurriculumService';

export class CurriculumController {
  constructor(private service: CurriculumService) {}

  async createCurriculum(req: Request, res: Response) {
    try {
      const curriculum = await this.service.createCurriculum(req.body);
      res.status(201).json(curriculum);
    } catch (e) {
      res.status(400).json({ error: 'Error creando curriculum' });
    }
  }

  async getCurriculum(req: Request, res: Response) {
    const id = Number(req.params.id);
    const curriculum = await this.service.getCurriculum(id);
    if (!curriculum) {
      res.status(404).json({ error: 'Curriculum no encontrado' });
    } else {
      res.json(curriculum);
    }
  }

  async updateCurriculum(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const updated = await this.service.updateCurriculum(id, req.body);
      if (!updated) {
        res.status(404).json({ error: 'Curriculum no encontrado' });
      } else {
        res.json(updated);
      }
    } catch (e) {
      res.status(400).json({ error: 'Error actualizando curriculum' });
    }
  }

  async deleteCurriculum(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await this.service.deleteCurriculum(id);
    if (!deleted) {
      res.status(404).json({ error: 'Curriculum no encontrado' });
    } else {
      res.status(204).send();
    }
  }
}
