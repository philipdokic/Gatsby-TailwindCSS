import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionService } from './production.service';
import { DocsList, Production } from './production.types';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  production$: Observable<Production>;
  productionKeys$: Observable<string[]>;
  /**
   * Constructor
   */
  constructor(
    public _productionService: ProductionService
  ) {
  }

  ngOnInit(): void {
    console.log("INSPECTION ON INIT EXAMPLE")

    // Get the activities
    this.production$ = this._productionService.production;
    this.productionKeys$ = this._productionService.productionKeys;
  }

}
