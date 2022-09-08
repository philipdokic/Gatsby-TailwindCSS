import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionsService } from './productions.service';
import { Production } from './productions.types';

@Component({
  selector: 'admin-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductionsComponent implements OnInit {
  productions$: Observable<Production[]>;
  /**
   * Constructor
   */
  constructor(
    public _productionService: ProductionsService
  ) {
  }

  ngOnInit(): void {
    console.log("ON INIT EXAMPLE")
    // Get the activities
    this.productions$ = this._productionService.productions;
  }

}

