import { Curriculum } from '../models/Curriculum';

export interface ICurriculumRepository {
  create(curriculum: Curriculum): Promise<Curriculum>;
  getById(id: number): Promise<Curriculum | null>;
  update(id: number, curriculum: Curriculum): Promise<Curriculum | null>;
  delete(id: number): Promise<boolean>;
}
