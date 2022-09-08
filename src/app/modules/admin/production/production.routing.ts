import { Route } from '@angular/router';
import { ProductionComponent } from './production.component';
import { DocsResolver, ProductionResolver } from './production.resolvers';

export const productionRoutes: Route[] = [
    {
        path     : '',
        component: ProductionComponent,
        resolve  : {
            data: ProductionResolver,
            docs: DocsResolver
        }
    }
];
