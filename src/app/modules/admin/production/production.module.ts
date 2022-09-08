import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { RouterModule } from '@angular/router';
import { productionRoutes } from './production.routing';
import { DocsTable } from './docs-table/docs-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { DocUploaderComponent } from './uploader/uploader.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    RouterModule.forChild(productionRoutes),
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule
  ],
  declarations: [
    ProductionComponent,
    DocsTable,
    DocUploaderComponent
  ]
})
export class ProductionModule { }
