import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesEditComponent } from './spaces-edit.component';

describe('SpacesEditComponent', () => {
  let component: SpacesEditComponent;
  let fixture: ComponentFixture<SpacesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
