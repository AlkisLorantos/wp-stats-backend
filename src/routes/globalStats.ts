import { Router } from 'express';
import { authMiddleware } from '../middleware/client/auth';
import { 
    getPlayerStatsController, 
    getTeamStatsController, 
    getGlobalStatsController 
} from '../controllers/stat';

const globalStatsRouter = Router();
globalStatsRouter.use(authMiddleware);

globalStatsRouter.get('/', getGlobalStatsController);
globalStatsRouter.get('/players/:id', getPlayerStatsController);
globalStatsRouter.get('/teams/:id', getTeamStatsController);

export default globalStatsRouter;