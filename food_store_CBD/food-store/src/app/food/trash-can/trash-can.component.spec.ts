import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCanComponent } from './trash-can.component';

describe('TrashCanComponent', () => {
  let component: TrashCanComponent;
  let fixture: ComponentFixture<TrashCanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashCanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
