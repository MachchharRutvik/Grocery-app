import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendinItemsComponent } from './trendin-items.component';

describe('TrendinItemsComponent', () => {
  let component: TrendinItemsComponent;
  let fixture: ComponentFixture<TrendinItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendinItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendinItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
