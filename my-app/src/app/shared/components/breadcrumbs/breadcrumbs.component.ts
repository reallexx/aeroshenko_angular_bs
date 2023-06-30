import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, Renderer2 } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements AfterViewChecked {
  constructor(private renderer: Renderer2, public breadcrumbsService: BreadcrumbsService) {}

  ngAfterViewChecked(): void {
    const chevron: HTMLCollectionOf<Element> = document.getElementsByClassName('p-breadcrumb-chevron');
    if (this.breadcrumbsService.items.length === 0) {
      this.renderer.removeClass(chevron[0], 'pi-chevron-right');
    } else {
      this.renderer.addClass(chevron[0], 'pi-chevron-right');
    }
  }
}
