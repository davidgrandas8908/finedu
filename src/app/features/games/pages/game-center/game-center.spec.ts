import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCenter } from './game-center';

describe('GameCenter', () => {
  let component: GameCenter;
  let fixture: ComponentFixture<GameCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
