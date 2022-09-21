
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, map, Observable, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { DefectsService } from '../../defects/defects.service';
import { Defect } from '../../defects/defects.types';
import normalize  from 'array-normalize';







@Component({
    selector       : 'production-report',
    templateUrl    : './report.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionReportComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
    selectedDefect: Defect;
    defects: Defect[];
    // defects$: Observable<Defect[]>;
    levels = ["Level 1","Level 2","Level 3"]
    normalizedSizes: number[]
    defectsCount: any = {
        "Level 1": 0,
        "Level 2": 0,
        "Level 3": 0,
        total: 0
    };
    colors = {
        "Level 1": 'rgb(45, 173, 45)', "Level 2": 'rgb(220, 230, 72)', "Level 3": 'rgb(249, 34, 34)'
    }
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
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
        this.matDrawer.open()
       
        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                // this._changeDetectorRef.markForCheck();
            });

        //  = this._defectService.defects

        this._defectService.defects.subscribe( defects => {
            this.defects = defects.defects

            this.normalizedSizes = normalize(this.defects.map( d => d.dimension.size))
            this.levels.forEach( level => this.defectsCount[level] = this.defects.filter( d => d.ERRORLEVEL === level).length )
            this.defectsCount.total = this.defects.length
            this.selectedDefect = this.defects[0]
            console.log('DEFECTS COUNT', this.defectsCount)
        })
       
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
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
      
      
    }

    openDefect(defect: Defect): void {
        this.matDrawer.open()
        this.selectedDefect = defect
        console.log("£ SELECCTED DEFECT QCRID_LINENUM:", this.selectedDefect.QCRID_LINENUM)
        this._defectService.getDefect(this.selectedDefect.QCRID_LINENUM).pipe(
            map(() => {
              // Get the note
              // this.$ = this._notesService.note$;
            })).subscribe();
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
