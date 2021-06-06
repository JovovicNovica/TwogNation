import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsCardComponent } from './tournaments-card.component';

describe('TournamentsCardComponent', () => {
  let component: TournamentsCardComponent;
  let fixture: ComponentFixture<TournamentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
