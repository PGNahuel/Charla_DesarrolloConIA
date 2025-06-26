import { Curriculum } from '../models/Curriculum';
import { CurriculumDTO } from '../models/CurriculumDTO';
import { ICurriculumRepository } from '../repositories/ICurriculumRepository';

export class CurriculumService {
  constructor(private repository: ICurriculumRepository) {}

  async createCurriculum(data: CurriculumDTO): Promise<Curriculum> {
    const curriculum: Curriculum = {
      fullName: data.fullName,
      content: data.content,
      createdAt: '',
      version: 1
    };
    return this.repository.create(curriculum);
  }

  async getCurriculum(id: number): Promise<Curriculum | null> {
    return this.repository.getById(id);
  }

  async updateCurriculum(id: number, data: CurriculumDTO): Promise<Curriculum | null> {
    const existing = await this.repository.getById(id);
    if (!existing) return null;
    const updated: Curriculum = {
      ...existing,
      fullName: data.fullName,
      content: data.content
    };
    return this.repository.update(id, updated);
  }

  async deleteCurriculum(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
