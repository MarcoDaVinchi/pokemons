import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('Provide an ID to your modal!');
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'app-modal') {
        this.close();
      }
    })

    this.modalService.add(this);
  }

  ngOnDestroy(): void{
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void{
    this.element.style.display = 'flex';
    document.body.classList.add('app-modal-open');
  }

  close(): void{
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}
