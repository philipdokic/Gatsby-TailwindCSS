import { Route } from '@angular/router';
import { ProductionComponent } from './production.component';
import { DefectPhotosResolver, DefectResolver, DefectsResolver, DefectTagsResolver, DocsResolver, ProductionResolver } from './production.resolvers';

export const productionRoutes: Route[] = [
    {
        path     : '',
        component: ProductionComponent,
        resolve  : {
            data: ProductionResolver,
            docs: DocsResolver,
            tags: DefectTagsResolver,
            photos: DefectPhotosResolver,
            defects: DefectsResolver,
            defect: DefectResolver,
        }
    }
];
