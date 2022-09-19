import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { assign } from 'lodash-es';
import * as moment from 'moment';
import { ProductionReportComponent } from '../report.component';
import { DefectsService } from 'app/modules/admin/defects/defects.service';


interface Defect {
    id       : string,
    type     : string,
    title    : string,
    notes    : string,
    completed: boolean,
    dueDate  : Date,
    priority : number,
    order: number,
}

@Component({
    selector       : 'defect-info',
    templateUrl    : './defect.component.html',
    styleUrls: ['./defect.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectInfoComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('titleField') private _titleField: ElementRef;

    tagsEditMode: boolean = false;
    // defect: Defect;
    defectForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    defect$: Observable<Defect>

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _productionReportComponent: ProductionReportComponent,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _defectService: DefectsService
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
        
        this._defectService.getDefect('032QN030667-2').pipe(
            map((defect) => {
                console.log("--- GET DEFECT", defect)
              // Get the note
              // this.$ = this._notesService.note$;
            })).subscribe();
        this.defect$ = this._defectService.defect$

        this._defectService.defect$.subscribe( def => console.log("FETCHED DEFECT", def))
        // Open the drawer
        this._productionReportComponent.matDrawer.close();

        // Create the defect form
        this.defectForm = this._formBuilder.group({
            id       : [''],
            type     : [''],
            title    : [''],
            notes    : [''],
            completed: [false],
            dueDate  : [null],
            priority : [0],
            order    : [0]
        });

      
        
        // this.defect = {
        //     id       : 'aa',
        //     type     : 'defect type',
        //     title    : 'defect title',
        //     notes    : 'defect notes',
        //     completed: false,
        //     dueDate  : null,
        //     priority : 0,
        //     order: 1,

        // }

      

        // Update defect when there is a value change on the defect form
        this.defectForm.valueChanges
            .pipe(
                tap((value) => {

                    // Update the defect object
                    // this.defect = assign(this.defect, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {

                // Update the defect on the server
                // this._defectsService.updateDefect(value.id, value).subscribe();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for NavigationEnd event to focus on the title field
        this._router.events
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => {

                // Focus on the title field
                this._titleField.nativeElement.focus();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Listen for matDrawer opened change
        this._productionReportComponent.matDrawer.openedChange
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(opened => opened)
            )
            .subscribe(() => {

                // Focus on the title element
                this._titleField.nativeElement.focus();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        // if ( this._tagsPanelOverlayRef )
        // {
        //     this._tagsPanelOverlayRef.dispose();
        // }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._productionReportComponent.matDrawer.close();
    }

    /**
     * Toggle the completed status
     */
    toggleCompleted(): void
    {
        // Get the form control for 'completed'
        const completedFormControl = this.defectForm.get('completed');

        // Toggle the completed status
        completedFormControl.setValue(!completedFormControl.value);
    }

    /**
     * Open tags panel
    


    /**
     * Set the defect priority
     *
     * @param priority
     */
    setDefectPriority(priority): void
    {
        // Set the value
        this.defectForm.get('priority').setValue(priority);
    }

    /**
     * Check if the defect is overdue or not
     */
    isOverdue(): boolean
    {
        // return moment(this.defect.dueDate, moment.ISO_8601).isBefore(moment(), 'days');
        return false
    }

    /**
     * Delete the defect
     */
    deleteDefect(): void
    {
        // Open the confirmation dialog
       
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
