import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'defect-media',
  templateUrl: './media.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectMediaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
