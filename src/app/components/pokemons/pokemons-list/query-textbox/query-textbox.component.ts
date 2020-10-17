import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-query-textbox',
  templateUrl: './query-textbox.component.html',
  styleUrls: ['./query-textbox.component.scss'],
  animations: [
    trigger('activeInactive', [
      state(
        'focused',
        style({
          outline: 'none',
          borderBottom: '5px solid #58A94A',
        })
      ),
      state(
        'inacive',
        style({
          outline: 'none',
          borderBottom: '5px solid black',
        })
      ),
      transition('focused<=>inacive',[animate('0.2s')]),
    ]),
  ],
})
export class QueryTextboxComponent implements OnInit {
  isActive = false;
  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    this.changed.emit(this.filter);
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  toggleActivate() {
    this.isActive = !this.isActive;
  }
}
