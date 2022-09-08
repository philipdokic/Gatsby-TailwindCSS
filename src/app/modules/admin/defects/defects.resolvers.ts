import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DefectsService } from './defects.service';

@Injectable({
    providedIn: 'root'
})
export class DefectsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _defectsService: DefectsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._defectsService.getDefects();
    }
}
