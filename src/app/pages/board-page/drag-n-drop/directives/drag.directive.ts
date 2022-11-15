import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {DragNDropService} from "../service/drag-n-drop.service";



@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Input() id: number
  constructor(private el: ElementRef,
              private dnd: DragNDropService
  ) {
  }

  @HostListener('dragstart') onDragStart() {
    this.el.nativeElement.classList.add('dragged')
    this.dnd.sendSource(this.el.nativeElement.parentNode.parentNode.parentNode.dataset.source)
  }

  @HostListener('dragend') onDragEnd() {
    this.dnd.sendTaskId(this.id)
    this.el.nativeElement.classList.remove('dragged')
  }

}
