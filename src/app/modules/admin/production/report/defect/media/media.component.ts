import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DefectsService } from 'app/modules/admin/defects/defects.service';
import { Media } from 'app/modules/admin/defects/defects.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'defect-media',
  templateUrl: './media.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectMediaComponent implements OnInit {

  photos$: Observable<Media[]>

  constructor(
    private _defectService: DefectsService
  ) { }

  ngOnInit() {
    this.photos$ = this._defectService.photos$
  }

}
