import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector       : 'production-docs',
    templateUrl    : './docs.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionDocsComponent implements OnInit
{
   
    ngOnInit(): void
    {
        // Create the form
    
    }
}
