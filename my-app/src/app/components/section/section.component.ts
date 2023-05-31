import { Component } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  searchString = '';

  search() {
    console.log('Searching for ' + this.searchString);
  }
}
