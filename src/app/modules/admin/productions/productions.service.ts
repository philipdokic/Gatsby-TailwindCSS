import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Production, ProductionsList } from './productions.types';

@Injectable({
    providedIn: 'root'
})
export class ProductionsService
{
    // Private
    private _productions: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for productions
     */
    get productions(): Observable<any>
    {
        return this._productions.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get productions
     */
    getProductions(): Observable<any>
    {

        console.log("INSPECTIONS SERVICE WORKS")
        return this._httpClient.get<ProductionsList>('api/productions').pipe(
            tap((response: ProductionsList) => {
                console.log("RESPONSE", response)
                this._productions.next(response);
            })
        );
    }
  
}
