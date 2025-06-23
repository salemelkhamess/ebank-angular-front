import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAthoriezdComponent } from './not-athoriezd.component';

describe('NotAthoriezdComponent', () => {
  let component: NotAthoriezdComponent;
  let fixture: ComponentFixture<NotAthoriezdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAthoriezdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAthoriezdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
