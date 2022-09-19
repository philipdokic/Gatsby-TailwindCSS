
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';


interface Defect {
    x: number,
    y: number,
    size: number,
    level: 1 | 2 | 3  
}




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
    defectsCount: any = {
        level_1: 0,
        level_2: 0,
        level_3: 0,
        total: 0
    };
    colors = {
        1: 'rgb(45, 173, 45)', 2: 'rgb(220, 230, 72)', 3: 'rgb(249, 34, 34)'
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
        private _fuseNavigationService: FuseNavigationService
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
                this._changeDetectorRef.markForCheck();
            });

        this.defects = [
            {
                x: 200, y: 100, size: 20, level: 1
            },
            {
                x: 210, y: 220, size: 50, level: 1
            },
            {
                x: 300, y: 300, size: 10, level: 2
            },
            {
                x: 290, y: 100, size: 100, level: 2
            },
            {
                x: 260, y: 600, size: 40, level: 2
            },
            {
                x: 310, y: 60, size: 20, level: 2
            },
            {
                x: 230, y: 240, size: 30, level: 3
            },
            
        ]

       
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

    openDefect(): void {
        this.matDrawer.open()
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
