import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionsComponent } from './productions.component';
// import { TableFilteringExample } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { productionsRoutes } from 'app/modules/admin/productions/productions.routing';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TableStickyColumns } from './table/table.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  
  imports: [
    RouterModule.forChild(productionsRoutes),
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule
    
  ],
  declarations: [
    ProductionsComponent,
    TableStickyColumns,
  ]
})
export class ProductionsModule { }
