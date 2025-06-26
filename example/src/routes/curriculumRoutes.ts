import { Router } from 'express';
import { CurriculumController } from '../controllers/CurriculumController';
import { CurriculumService } from '../services/CurriculumService';
import { SqliteCurriculumRepository } from '../repositories/SqliteCurriculumRepository';

const router = Router();
const repository = new SqliteCurriculumRepository();
const service = new CurriculumService(repository);
const controller = new CurriculumController(service);

router.post('/', controller.createCurriculum.bind(controller));
router.get('/:id', controller.getCurriculum.bind(controller));
router.put('/:id', controller.updateCurriculum.bind(controller));
router.delete('/:id', controller.deleteCurriculum.bind(controller));

export { router as curriculumRouter };
