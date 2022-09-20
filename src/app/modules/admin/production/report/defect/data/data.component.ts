import {  ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DefectsService } from 'app/modules/admin/defects/defects.service';
import { Defect } from 'app/modules/admin/defects/defects.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'defect-data',
  templateUrl: './data.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDataComponent implements OnInit{

  defect$: Observable<Defect>;
  defectFields = [
    {key: "ERRORGROUPID", name: "Error group ID"},
    {key: "LINENUM", name: "Line number"},
    {key: "BU_ACTION_DESC", name: "BU action desc"},
    {key: "COMPONENTTYPE", name: "Component type"},
    {key: "MOULDID", name: "Mould ID"},
    {key: "INSPECTION_METHOD_DESC", name: "Inspection method desc"},
    {key: "TOTAL_NUMBEROFGLASSLAYERS", name: "Total number of glass layers"},
    {key: "EMPLOYEE", name: "Employee"},
    {key: "FACTORYID", name: "Factory ID"},
    {key: "INVENTSERIALID", name: "Inventory serial ID"},
  ]

  constructor(
    private _defectService: DefectsService,
  ) {}

  ngOnInit() {
    this.defect$ = this._defectService.defect$

  }

}
