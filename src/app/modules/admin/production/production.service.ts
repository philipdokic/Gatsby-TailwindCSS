import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap, of, switchMap, throwError } from 'rxjs';
import { Doc, DocDTO, DocsList, DocsProduction, Production, ProductionData } from './production.types';

@Injectable({
    providedIn: 'root'
})
export class ProductionService {
    // Private
    private _production: BehaviorSubject<any> = new BehaviorSubject(null);
    private _docs: BehaviorSubject<any> = new BehaviorSubject(null);
    private _doc: BehaviorSubject<any> = new BehaviorSubject(null);
    private _files: BehaviorSubject<any> = new BehaviorSubject(null);
    // private _productionKeys: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for production
     */
    get production(): Observable<any> {
        return this._production.asObservable();
    }
    // get productionKeys(): Observable<any>
    // {
    //     return this._productionKeys.asObservable();
    // }
    get docs$(): Observable<any> {
        return this._docs.asObservable();
    }
    get doc$(): Observable<any> {
        return this._doc.asObservable();
    }
    get files$(): Observable<any> {
        return this._files.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get production
     */
    getProduction(PROD_ID: string): Observable<ProductionData> {

        console.log("GET INSPECTION SERVICE WORKS")
        return this._httpClient.get<Production>(`api/productions/${PROD_ID}`).pipe(
            map((production) => {


                console.log("GET PRODUCTION SERVICE", production)
                // Update the course
                this._production.next(production);
                //@ts-ignore
                this._docs.next(production.production._docs);


                // Return the course
                return { production }
            }),
            switchMap((production) => {

                if (!production) {
                    return throwError('Could not found course with PROD_ID of ' + PROD_ID + '!');
                }

                const productionData = Object.create(null)
                //@ts-ignore
                Object.assign(productionData, production.production.production)

                const productionKeys = Object.keys(productionData)

                console.log("PRODUCTION RECIEVED", { production: productionData, keys: productionKeys })
                return of({ production: productionData, keys: productionKeys });
            })
        );
    }
    getDocs(): Observable<DocsList> {

        console.log("_docs SERVICE WORKS")
        return this._httpClient.get<DocsList>('api/docs').pipe(
            tap((response: DocsList) => {
                console.log("_docs RESPONSE", response.docs)
                this._files.next(response.docs);
            })
        );
    }
    getDocById(doc: Doc): Observable<DocDTO> {

        console.log("getDocById SERVICE WORKS", doc)
        const {_id} = doc
        return this._httpClient.get<DocDTO>(`api/docs/${_id}`).pipe(
            tap((response: DocDTO) => {
                console.log("_docs RESPONSE", response.doc)
                this._doc.next(response.doc);
            })
        );
    }

    createDocs(fileList: FileList): Observable<DocsList> {
        return this._httpClient.post<DocsList>('api/docs', { files: fileList }).pipe(
            switchMap((response: DocsList) => this.getDocs().pipe(
                // switchMap(() => this.getNoteById(response.id).pipe(
                //     map(() => response)
                // ))
            )));
    }
    uploadDocsToProduction(PROD_ID: string, fileList: FileList): Observable<any> {
        // console.log("++++SERVICE PROD_ID", PROD_ID)    
        return this._httpClient.put<any>('api/upload/productions/docs', { files: fileList, PROD_ID }).pipe(

            tap((response: DocsProduction) => {
                console.log("uploadDocsToProduction RESPONSE", response)
                this._files.next(response.docs);
                this._docs.next(response.production._docs);
                this._production.next({ production: response.production });
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

    removeDocFromProduction(production: Production, DOC_ID: string) {
        const {PROD_ID} = production

        return this._httpClient.patch<any>(`api/productions/docs`, { PROD_ID, DOC_ID }).pipe(

            tap((response) => {
                console.log("removeDocFromProduction RESPONSE", response)
                this._production.next({ production: response.production });
                this._docs.next(response.production._docs);
            })
        );
    }
    addFileToProduction(PROD_ID: string, DOC_ID: string) {
        console.log("addFileToProduction START", PROD_ID)

        return this._httpClient.put<any>(`api/productions/docs`, { PROD_ID, DOC_ID }).pipe(

            tap((response) => {
                console.log("removeDocFromProduction RESPONSE", response)
                this._production.next({ production: response.production });
                this._docs.next(response.production._docs);
            })
        );
    }

    deleteFile(file: Doc, production: Production){
        const {_id} = file
        return this._httpClient.delete<any>(`api/docs/${_id}` ).pipe(
            tap((response) => {
                console.log("DELETE FILE RESPONSE", response)
                const pr = {...production, _docs: production._docs.filter(  doc => doc._id !== _id ) }
                this._docs.next(pr._docs);
                // this._production.next(pr);
                this._files.next(response.files);
            })
        ); 
    }

}
