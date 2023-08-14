import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsNotFoundComponent } from './items-not-found.component';

describe('NotFoundItemsComponent', () => {
  let component: ItemsNotFoundComponent;
  let fixture: ComponentFixture<ItemsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
