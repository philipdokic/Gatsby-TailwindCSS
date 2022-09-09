import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductionService } from '../production.service';
import { Doc, Production } from '../production.types';

@Component({
    selector       : 'docs-uploader',
    templateUrl    : './uploader.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocUploaderComponent implements OnInit, OnDestroy
{

 



    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private production$: Observable<Production>
    PROD_ID: string

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _productionService: ProductionService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._productionService.production.subscribe( p => {

            console.log("~~~~~SUBSCRIBED PRODUCTION", p)            
            this.PROD_ID = p.production.PROD_ID
        }
        )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    
    /**
     * Upload image to given note
     *
     * @param note
     * @param fileList
     */
    uploadFile(fileList: FileList): void
    {

        console.log("FILE SELECTED", fileList)
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        this._productionService.uploadDocsToProduction(this.PROD_ID, fileList).pipe(
            map(() => {
                // Get the note
                // this.$ = this._notesService.note$;
            })).subscribe();

        // this._readAsDataURL(file).then((data) => {

        //     // Update the image
        //     // note.image = data;

        //     // Update the note
        //     // this.noteChanged.next(note);
        // });
    }

    /**
     * Remove the image on the given note
     *
     * @param note
     */
    removeImage(doc: Doc): void
    {
        // note.image = null;

        // Update the note
        // this.noteChanged.next(note);
    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any>
    {
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }
}
