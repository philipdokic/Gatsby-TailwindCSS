import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Defect, DefectsList } from './defects.types';

@Injectable({
    providedIn: 'root'
})
export class DefectsService
{
    // Private
    private _defects: BehaviorSubject<any> = new BehaviorSubject(null);

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
     * Getter for defects
     */
    get defects(): Observable<any>
    {
        return this._defects.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get defects
     */
    getDefects(): Observable<any>
    {

        console.log("DEFECT SERVICE WORKS")
        return this._httpClient.get<DefectsList>('api/defects').pipe(
            tap((response: DefectsList) => {
                console.log("RESPONSE", response)
                this._defects.next(response);
            })
        );
    }
}
