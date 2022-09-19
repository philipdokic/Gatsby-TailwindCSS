import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, filter, Subject, takeUntil, tap } from 'rxjs';
import { assign } from 'lodash-es';
import * as moment from 'moment';
import { Defect, DefectDTO, Tag } from 'app/modules/admin/defects/defects.types';
import { DefectInfoComponent } from '../defect.component';
import { DefectsService } from 'app/modules/admin/defects/defects.service';

@Component({
    selector       : 'defect-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDetailsComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('titleField') private _titleField: ElementRef;

    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    defect: Defect;
    defectForm: UntypedFormGroup;
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _defectInfoComponent: DefectInfoComponent,
        private _defectService: DefectsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
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
        // Open the drawer
        // this._defectInfoComponent.matDrawer.open();

        // Create the defect form
        this.defectForm = this._formBuilder.group({
            id       : [''],
            type     : [''],
            title    : [''],
            notes    : [''],
            completed: [false],
            dueDate  : [null],
            priority : [0],
            tags     : [[]],
            order    : [0]
        });

        

        // Get the tags
        this._defectService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                console.log("GET TAGS", tags)
                this.tags = tags;
                this.filteredTags = tags;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the defect
        // this._defectService.defect$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((defect: DefectDTO) => {
        //         this.defect = defect.defect;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the defect
        this._defectService.defect$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({defect}: DefectDTO) => {

                console.log("GET DEFECT", defect)

                // Get the defect
                this.defect = defect;

                // Patch values to the form from the defect
                this.defectForm.patchValue(defect, {emitEvent: false});

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Update defect when there is a value change on the defect form
        this.defectForm.valueChanges
            .pipe(
                tap((value) => {

                    // Update the defect object
                    this.defect = assign(this.defect, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {

                // Update the defect on the server
                // this._defectService.updateDefect(value.id, value).subscribe();

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
        // this._defectInfoComponent.matDrawer.openedChange
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         filter(opened => opened)
        //     )
        //     .subscribe(() => {

        //         // Focus on the title element
        //         this._titleField.nativeElement.focus();
        //     });
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
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    // closeDrawer(): Promise<MatDrawerToggleResult>
    // {
    //     return this._defectInfoComponent.matDrawer.close();
    // }

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
     */
    openTagsPanel(): void
    {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(64)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      }
                                  ])
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

            // If overlay exists and attached...
            if ( this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached() )
            {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void
    {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void
    {
        // Return if the pressed key is not 'Enter'
        if ( event.key !== 'Enter' )
        {
            return;
        }

        // If there is no tag available...
        if ( this.filteredTags.length === 0 )
        {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = false
        // this.defect.tags.find(id => id === tag.id);

        // If the found tag is already applied to the defect...
        if ( isTagApplied )
        {
            // Remove the tag from the defect
            this.deleteTagFromDefect(tag);
        }
        else
        {
            // Otherwise add the tag to the defect
            this.addTagToDefect(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void
    {
        const tag = {
            title
        };

        // Create tag on the server
        this._defectService.createTag(tag)
            .subscribe((response) => {

                // Add the tag to the defect
                this.addTagToDefect(response);
            });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: Tag, event): void
    {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        this._defectService.updateTag(tag.id, tag)
            .pipe(debounceTime(300))
            .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: Tag): void
    {
        // Delete the tag from the server
        this._defectService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the defect
     *
     * @param tag
     */
    addTagToDefect(tag: Tag): void
    {
        // Add the tag
        this.defect.tags.unshift(tag.id);

        // Update the defect form
        this.defectForm.get('tags').patchValue(this.defect.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete tag from the defect
     *
     * @param tag
     */
    deleteTagFromDefect(tag: Tag): void
    {
        // Remove the tag
        // this.defect.tags.splice(this.defect.tags.findIndex(item => item === tag.id), 1);

        // Update the defect form
        this.defectForm.get('tags').patchValue(this.defect.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle defect tag
     *
     * @param tag
     */
    toggleDefectTag(tag: Tag): void
    {
        if ( this.defect.tags.includes(tag.id) )
        {
            this.deleteTagFromDefect(tag);
        }
        else
        {
            this.addTagToDefect(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean
    {
        return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    }

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
        return moment(this.defect.dueDate, moment.ISO_8601).isBefore(moment(), 'days');
    }

    /**
     * Delete the defect
     */
    deleteDefect(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete defect',
            message: 'Are you sure you want to delete this defect? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // // If the confirm button pressed...
            // if ( result === 'confirmed' )
            // {

            //     // Get the current defect's id
            //     const id = this.defect.id;

            //     // Get the next/previous defect's id
            //     const currentDefectIndex = this.defect.findIndex(item => item.id === id);
            //     const nextDefectIndex = currentDefectIndex + ((currentDefectIndex === (this.defect.length - 1)) ? -1 : 1);
            //     const nextDefectId = (this.defect.length === 1 && this.defect[0].id === id) ? null : this.defect[nextDefectIndex].id;

            //     // Delete the defect
            //     this._defectService.deleteDefect(id)
            //         .subscribe((isDeleted) => {

            //             // Return if the defect wasn't deleted...
            //             if ( !isDeleted )
            //             {
            //                 return;
            //             }

            //             // Navigate to the next defect if available
            //             if ( nextDefectId )
            //             {
            //                 this._router.navigate(['../', nextDefectId], {relativeTo: this._activatedRoute});
            //             }
            //             // Otherwise, navigate to the parent
            //             else
            //             {
            //                 this._router.navigate(['../'], {relativeTo: this._activatedRoute});
            //             }
            //         });

            //     // Mark for check
            //     this._changeDetectorRef.markForCheck();
            // }
        });
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
