import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Defect, DefectDTO, DefectsList } from './defects.types';

@Injectable({
    providedIn: 'root'
})
export class DefectsService
{
    // Private
    private _defects: BehaviorSubject<any> = new BehaviorSubject(null);
    private _defect: BehaviorSubject<any> = new BehaviorSubject(null);

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
    get defect(): Observable<any>
    {
        return this._defect.asObservable();
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
    getDefect(id: string): Observable<DefectDTO>
    {

        console.log("DEFECT SERVICE WORKS ID", id)
        return this._httpClient.get<DefectDTO>(`api/defects/${id}`).pipe(
            tap((response: DefectDTO) => {
                console.log("RESPONSE", response)
                this._defect.next(response);
            })
        );
    }
}
