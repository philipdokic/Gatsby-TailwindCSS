import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefectsComponent } from './defects.component';
import { TableFilteringExample } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { defectsRoutes } from 'app/modules/admin/defects/defects.routing';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  
  imports: [
    RouterModule.forChild(defectsRoutes),
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
    
  ],
  declarations: [
    DefectsComponent,
    TableFilteringExample
  ]
})
export class DefectsModule { }
