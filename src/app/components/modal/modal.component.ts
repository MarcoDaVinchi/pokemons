import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { IPokemon } from '../../types/interfaces';

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() selectedPokemon: IPokemon;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  confirm() {
    this.isConfirmed.emit(true);
  }

  close() {
    this.isConfirmed.emit(false);
  }
}
