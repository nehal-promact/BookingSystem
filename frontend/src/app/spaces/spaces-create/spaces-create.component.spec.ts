import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesCreateComponent } from './spaces-create.component';

describe('SpacesCreateComponent', () => {
  let component: SpacesCreateComponent;
  let fixture: ComponentFixture<SpacesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
