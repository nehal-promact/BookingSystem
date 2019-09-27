import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesDeleteComponent } from './spaces-delete.component';

describe('SpacesDeleteComponent', () => {
  let component: SpacesDeleteComponent;
  let fixture: ComponentFixture<SpacesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
