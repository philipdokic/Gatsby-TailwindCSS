import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DefectsService } from './defects.service';
import { Defect } from './defects.types';

@Component({
  selector: 'admin-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.css'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectsComponent implements OnInit {
  defects$: Observable<Defect[]>;
  /**
   * Constructor
   */
  constructor(
      public _defectService: DefectsService
  )
  {
  }

  ngOnInit(): void
  {
      console.log("ON INIT EXAMPLE")
      // Get the activities
      this.defects$ = this._defectService.defects;
  }

}
