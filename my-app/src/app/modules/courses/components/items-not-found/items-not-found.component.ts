import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-items-not-found',
  templateUrl: './items-not-found.component.html',
  styleUrls: ['./items-not-found.component.scss'],
})
export class ItemsNotFoundComponent {
  constructor(private eventService: EventService) {}

  clearFilters() {
    this.eventService.clearFiltersEvent.emit();
  }
}
