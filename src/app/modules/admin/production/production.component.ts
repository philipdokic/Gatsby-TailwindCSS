import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, takeUntil} from 'rxjs';
import { ProductionService } from './production.service';
import { DocsList, Production } from './production.types';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher/media-watcher.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('filesDrawer') filesDrawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: any[] = [];
  selectedPanel: string = 'docs';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  production$: Observable<Production>;
  displayedFields: string[];

  /**
   * Constructor
   */
  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      private _fuseMediaWatcherService: FuseMediaWatcherService,
      public _productionService: ProductionService
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
    this.production$ = this._productionService.production;

    this._productionService.production.subscribe( production => {
        this.displayedFields =   [...Object.keys(production.production).filter( field => field[0] !== "_")]
    })
      // Setup available panels
      this.panels = [
          {
              id         : 'docs',
              icon       : 'heroicons_outline:book-open',
              title      : 'Documentation',
              description: 'Production instructions'
          },
          {
              id         : 'reports',
              icon       : 'heroicons_outline:document-report',
              title      : 'Reports',
              description: 'Inspection reports'
          },          
      ];

      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {

              // Set the drawerMode and drawerOpened
              if ( matchingAliases.includes('lg') )
              {
                  this.drawerMode = 'side';
                  this.drawerOpened = true;
              }
              else
              {
                  this.drawerMode = 'over';
                  this.drawerOpened = false;
              }

              // Mark for check
              this._changeDetectorRef.markForCheck();
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
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void
  {
      this.selectedPanel = panel;

      // Close the drawer on 'over' mode
      if ( this.drawerMode === 'over' )
      {
          this.drawer.close();
      }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any
  {
      return this.panels.find(panel => panel.id === id);
  }


  openFileManager(): void {
    this.drawer.toggle()
    this.filesDrawer.toggle()
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
