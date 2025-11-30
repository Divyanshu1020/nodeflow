import { createTRPCRouter } from '../init';
import { workflowRouter } from '@/feature/workflow/server/routes';
export const appRouter = createTRPCRouter({
    workflow : workflowRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;