import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { RouterModule } from '@angular/router';
import { productionRoutes } from './production.routing';
import { DocsTable } from './docs/docs-table/docs-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { DocUploaderComponent } from './uploader/uploader.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductionDocsComponent } from './docs/docs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'app/shared/shared.module';
import { FilesTable } from './files/files-table/files-table.component';
import { FilesComponent } from './files/files.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DocViewerComponent } from './viewer/viewer.component';
import { ProductionReportComponent } from './report/report.component';
import { DefectsDetailsComponent } from './report/details/details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';

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
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    SharedModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDividerModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRippleModule,
    MatTooltipModule,
    FuseFindByKeyPipeModule,
  ],
  declarations: [
    ProductionComponent,
    DocUploaderComponent,
    DocsTable,
    ProductionDocsComponent,
    FilesTable,
    FilesComponent,
    DocViewerComponent,
    ProductionReportComponent,
    DefectsDetailsComponent
  ]
})
export class ProductionModule { }
