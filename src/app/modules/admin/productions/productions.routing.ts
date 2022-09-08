import { Route } from '@angular/router';
import { ProductionsComponent } from './productions.component';
import { ProductionsResolver } from './productions.resolvers';

export const productionsRoutes: Route[] = [
    {
        path     : '',
        component: ProductionsComponent,
        resolve  : {
            data: ProductionsResolver
        }
    }
];
