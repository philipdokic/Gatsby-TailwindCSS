import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Defect } from '../defects.types';

const FIELDS = [    "QCRID",
"QCRID_LINENUM",
"ERRORID",
"ERRORGROUPID",
"LINENUM",
"BU_ACTION_DESC",
"DATAAREAID",
"QCRREPAIRINSTRUCTIONSTR",
"TRANSFERRED",
"CROSSSTARTINCL",
"CROSSENDINCL",
"LGTHSTARTINCL",
"LGTHENDINCL",
"CROSSEND",
"CROSSSTART",
"LGTHEND",
"LGTHSTART",
"WRINKLERATIO",
"BUSHINGS",
"BONDLINEDEFECT_DESC",
"QCRREPAIRINSTRUCTION",
"LENGTHWISESTART",
"CROSSWISESTART",
"LENGTHWISESTART_DESC",
"CROSSWISESTART_DESC",
"ROOTGEOMETRY",
"CROSSGENAREA",
"CROSSGENAREA_DESC",
"POSBUSH",
"QCRPRODTRANSID",
"QCRINTERNALEXTERNAL_DESC",
"FACTORY",
"LOCATIONID",
"INVENTSERIALID",
"DATE_",
"DATE_YEARPART",
"DATE_MONTHPART",
"BLADECOMPONENT",
"COMPONENTTYPE",
"MOULDID",
"ERRORLEVEL",
"ARMTYPE",
"QCRERRORFOUND",
"QCRERRORFOUND_DESC",
"INSPECTION_METHOD_DESC",
"STATUS",
"LGTHSTART_DIM_DESC",
"LGTHSTART_DIM_KEY",
"FACTORYID",
"NEW_SERIALID",
"LOCALRESPONSIBLELVL2",
"FWDEFECT_Desc",
"EMPLOYEE",
"LGTHSTART_DIM_1M_DESC",
"LGTHSTART_DIM_1M_KEY",
"TOTAL_NUMBEROFGLASSLAYERS",
"REINSPECTEDNAME"]

/**
 * @title Table with filtering
 */
@Component({
  selector: 'table-filtering-example',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableFilteringExample implements OnInit, AfterViewInit {
    @Input("data") _data: Defect[] = []

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
 
    // headerColumn = FIELDS.splice(0, 1)[0];
    // lastColumn = FIELDS.splice(FIELDS.length - 1, 1)[0];
    displayedColumns: string[] = FIELDS
    dataSource: any 
    // = new MatTableDataSource(this._data);

    ngOnInit(): void
    {
        console.log("ON INIT EXAMPLE")
        // console.log("headerColumn", this.headerColumn)
        // console.log("lastColumn", this.lastColumn)
        // Get the activities
        this.dataSource = new MatTableDataSource(this._data);

    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

}