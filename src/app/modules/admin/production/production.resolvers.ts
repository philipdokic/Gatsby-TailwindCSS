import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductionService } from './production.service';

@Injectable({
    providedIn: 'root'
})
export class ProductionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _productionService: ProductionService)
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
        // console.log("RESOLVER INSPECTION ActivatedRouteSnapshot", route.params)
        // console.log("RESOLVER INSPECTION RouterStateSnapshot", state)
        const PROD_ID = route.params.id
        this._productionService.getDocs()
        return this._productionService.getProduction(PROD_ID);
    }
}



@Injectable({
    providedIn: 'root'
})
export class DocsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _productionService: ProductionService)
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
        // console.log("RESOLVER INSPECTION ActivatedRouteSnapshot", route.params)
        // console.log("RESOLVER INSPECTION RouterStateSnapshot", state)
        
        return this._productionService.getDocs()
    }
}

