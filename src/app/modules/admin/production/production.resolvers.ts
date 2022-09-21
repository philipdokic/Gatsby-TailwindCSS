import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DefectsService } from '../defects/defects.service';
import { Media, Tag } from '../defects/defects.types';
import { ProductionService } from './production.service';

@Injectable({
    providedIn: 'root'
})
export class ProductionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _productionService: ProductionService,
        private _defectService: DefectsService
    )
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
        // this._defectService.getDefect('032QN030667-2')
        return this._productionService.getProduction(PROD_ID);
    }
}



@Injectable({
    providedIn: 'root'
})
export class DefectTagsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _defectsService: DefectsService)
    {
    }

   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
    {
        return this._defectsService.getTags();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DefectPhotosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _defectsService: DefectsService)
    {
    }

   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Media[]>
    {
        return this._defectsService.getPhotos();
    }
}
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

   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._defectsService.getDefects();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DefectResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _defectsService: DefectsService)
    {
    }

   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._defectsService.getDefect();
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

