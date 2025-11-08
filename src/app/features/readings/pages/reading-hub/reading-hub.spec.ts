import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingHub } from './reading-hub';

describe('ReadingHub', () => {
  let component: ReadingHub;
  let fixture: ComponentFixture<ReadingHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
