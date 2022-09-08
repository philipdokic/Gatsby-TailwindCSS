import { Route } from '@angular/router';
import { DefectsComponent } from './defects.component';
import { DefectsResolver } from './defects.resolvers';

export const defectsRoutes: Route[] = [
    {
        path     : '',
        component: DefectsComponent,
        resolve  : {
            data: DefectsResolver
        }
    }
];
