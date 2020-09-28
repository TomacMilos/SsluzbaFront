import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SutdentPageComponent } from './sutdent-page.component';

describe('SutdentPageComponent', () => {
  let component: SutdentPageComponent;
  let fixture: ComponentFixture<SutdentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SutdentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SutdentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
