import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {DragNDropService} from "../service/drag-n-drop.service";

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @Input() target!: string

  constructor(private el: ElementRef,
              private dnd: DragNDropService) {
  }

  @HostListener('dragenter') onDragStart() {
    const parent = this.el.nativeElement.parentElement.children
    for (const parentElement of parent) {
      parentElement.classList.remove('target')
    }
    console.log(this.target)
    this.el.nativeElement.classList.add('target')
    this.dnd.sendTarget(this.target)
  }

}
