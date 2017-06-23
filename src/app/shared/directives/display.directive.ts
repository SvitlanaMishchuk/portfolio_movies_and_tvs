import {Directive, ElementRef, HostListener} from "@angular/core";
@Directive({
  selector:'[show]'
})

export class DisplayDirective {
  constructor (private element:ElementRef) {}

  @HostListener("mouseover") onMouseOver() {
    this.setDisplayProperty('visible');
  }

  @HostListener("mouseout") onMouseOut() {
    this.setDisplayProperty('hidden');
  }
  private setDisplayProperty(val) {
    this.element.nativeElement.children[1].style.visibility = val;
  }
}
