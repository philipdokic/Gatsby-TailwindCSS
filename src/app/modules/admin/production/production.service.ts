import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap, of, switchMap, throwError  } from 'rxjs';
import { Doc, DocsList, DocsProduction, Production, ProductionData } from './production.types';

@Injectable({
    providedIn: 'root'
})
export class ProductionService
{
    // Private
    private _production: BehaviorSubject<any> = new BehaviorSubject(null);
    private _docs: BehaviorSubject<any> = new BehaviorSubject(null);
    private _productionKeys: BehaviorSubject<any> = new BehaviorSubject(null);

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
     * Getter for production
     */
    get production(): Observable<any>
    {
        return this._production.asObservable();
    }
    get productionKeys(): Observable<any>
    {
        return this._productionKeys.asObservable();
    }
    get docs$(): Observable<any>
    {
        return this._docs.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get production
     */
    getProduction(PROD_ID: string): Observable<ProductionData>
    {

        console.log("GET INSPECTION SERVICE WORKS")
        return this._httpClient.get<Production>(`api/productions/${PROD_ID}`).pipe(
            map((production) => {

                
                
                // Update the course
                this._production.next(production);
                

                // Return the course
                return {production} 
            }),
            switchMap((production) => {

                if ( !production )
                {
                    return throwError('Could not found course with PROD_ID of ' + PROD_ID + '!');
                }

                const productionData = Object.create(null)
                //@ts-ignore
                Object.assign(productionData, production.production.production)
                
                const productionKeys = Object.keys(productionData) 
                this._productionKeys.next(productionKeys);
                
                console.log("PRODUCTION RECIEVED", {production: productionData, keys: productionKeys})                 
                return of({production: productionData, keys: productionKeys});
            })
        );
    }
    getDocs(): Observable<DocsList>
    {

        console.log("_docs SERVICE WORKS")
        return this._httpClient.get<DocsList>('api/docs').pipe(
            tap((response: DocsList) => {
                console.log("_docs RESPONSE", response.docs)
                this._docs.next(response.docs);
            })
        );
    }

    createDocs(fileList: FileList) : Observable<DocsList>
    {
        return this._httpClient.post<DocsList>('api/docs', {files: fileList}).pipe(
            switchMap((response: DocsList) => this.getDocs().pipe(
                // switchMap(() => this.getNoteById(response.id).pipe(
                //     map(() => response)
                // ))
            )));
    }
    addDocsToProduction(PROD_ID: string, fileList: FileList) : Observable<any>
    {
        // console.log("++++SERVICE PROD_ID", PROD_ID)    
        return this._httpClient.put<any>('api/productions/docs', {files: fileList, PROD_ID}).pipe(

            tap((response: DocsProduction) => {
                console.log("addDocsToProduction RESPONSE", response)
                this._docs.next(response.docs);
                this._production.next({production: response.production});
            })
            // switchMap((response: DocsProduction) => 
            // this.getDocs().pipe(
            //     // switchMap(() => this.getNoteById(response.id).pipe(
            //     //     map(() => response)
            //     // ))
            // )
            // )
            );
    }
   
}
