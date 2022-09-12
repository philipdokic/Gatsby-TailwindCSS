import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ProductionService } from '../production.service';
import { Doc } from '../production.types';

@Component({
    selector: 'file-viewer',
    templateUrl: './viewer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocViewerComponent implements OnInit, OnDestroy, AfterViewInit {

    doc$: Observable<Doc>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { doc: Doc },
        private _productionService: ProductionService,
        private _matDialogRef: MatDialogRef<DocViewerComponent>
    ) {
    }

    ngOnInit(): void {
        console.log("VIEWER DOC:", this._data.doc)
        this._productionService.getDocById(this._data.doc).subscribe();
        this.doc$ = this._productionService.doc$;
    }

    ngAfterViewInit(): void {

       
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
