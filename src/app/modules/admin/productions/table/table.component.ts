import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Production } from '../productions.types';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


/**
 * @title Table with sticky columns
 */
@Component({
  selector: 'productions-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})

export class TableStickyColumns implements OnInit, AfterViewInit {
  @Input()
  dataSourceInput: Production[]

  dataSource
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
    ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    console.log("ngAfterViewInit", this.dataSourceInput)
    this.dataSource = new MatTableDataSource(this.dataSourceInput);
    this.dataSource.sort = this.sort;
  }
 

  displayedColumns: string[] = []


  ngOnInit(): void {
    this.displayedColumns = ['STATE', ...Object.keys(this.dataSourceInput[0])].filter( f => f.search('_'))
    // , 'star']
  }

  getRecord(row: any) {
    console.log("CLICKED ROW", row)
    this.router.navigateByUrl(`productions/${row.PROD_ID}`)
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}




