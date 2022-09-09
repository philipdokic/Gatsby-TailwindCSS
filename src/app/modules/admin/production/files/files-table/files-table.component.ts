import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductionService } from '../../production.service';
import { Doc } from '../../production.types';


/**
 * @title Table with sticky columns
 */
@Component({
  selector: 'files-table',
  templateUrl: 'files-table.component.html',
  styleUrls: ['files-table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})

export class FilesTable implements OnInit, AfterViewInit {
  // @Input()
  // docs$: Doc[]

  docs$: Observable<Doc[]> 

  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedDoc: Doc | null = null;
  selectedDocForm: UntypedFormGroup;
  displayedColumns: string[] = ["name","type"]
  dataSource: MatTableDataSource<any> = new MatTableDataSource();


  private _unsubscribeAll: Subject<any> = new Subject<any>();

  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private _productionService: ProductionService,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    console.log("ngAfterViewInit", this.docs$)

    this.dataSource.sort = this.sort;
  }




  ngOnInit(): void {
    this.docs$ = this._productionService.docs$
    this._productionService.docs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((docs) => {
                console.log("ON ITIN TABLE FILES:", docs)
                // Store the data
                // this.docs = docs;

                // Store the table data
                this.dataSource.data = docs;
                // this.displayedColumns = ["name","type"]
                // this.dataSource = new MatTableDataSource(docs.docs);
            });


    
    
    // this.displayedColumns = [...Object.keys(this.docs$[0])]
    // , 'star']
  

    this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return null
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
  }

  getRecord(row: any) {
    this.router.navigateByUrl(`docions/${row.PROD_ID}`)
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  
    closeDetails(): void
    {
        this.selectedDoc = null;
    }

    /**
     * Update the selected doc using the form data
     */
     updateSelectedDoc(): void
     {
         // Get the doc object
         const doc = this.selectedDocForm.getRawValue();
 
         // Remove the currentImageIndex field
         delete doc.currentImageIndex;
 
         // Update the doc on the server
        //  this._inventoryService.updateDoc(doc.id, doc).subscribe(() => {
 
        //      // Show a success message
        //      this.showFlashMessage('success');
        //  });
     }
 
     /**
      * Delete the selected doc using the form data
      */
     deleteSelectedDoc(): void
     {
         // Open the confirmation dialog
         const confirmation = this._fuseConfirmationService.open({
             title  : 'Delete doc',
             message: 'Are you sure you want to remove this doc? This action cannot be undone!',
             actions: {
                 confirm: {
                     label: 'Delete'
                 }
             }
         });
 
         // Subscribe to the confirmation dialog closed action
         confirmation.afterClosed().subscribe((result) => {
 
             // If the confirm button pressed...
             if ( result === 'confirmed' )
             {
 
                 // Get the doc object
                 const doc = this.selectedDocForm.getRawValue();
 
                 // Delete the doc on the server
                //  this._inventoryService.deleteDoc(doc.id).subscribe(() => {
 
                //      // Close the details
                //      this.closeDetails();
                //  });
             }
         });
     }
 
     /**
      * Show flash message
      */
     showFlashMessage(type: 'success' | 'error'): void
     {
         // Show the message
         this.flashMessage = type;
 
         // Mark for check
         this._changeDetectorRef.markForCheck();
 
         // Hide it after 3 seconds
         setTimeout(() => {
 
             this.flashMessage = null;
 
             // Mark for check
             this._changeDetectorRef.markForCheck();
         }, 3000);
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




