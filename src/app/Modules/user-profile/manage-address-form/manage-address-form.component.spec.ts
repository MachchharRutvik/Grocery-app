import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressFormComponent } from './manage-address-form.component';

describe('ManageAddressFormComponent', () => {
  let component: ManageAddressFormComponent;
  let fixture: ComponentFixture<ManageAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
