import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDate1Component } from './widget-date1.component';

describe('WidgetDate1Component', () => {
  let component: WidgetDate1Component;
  let fixture: ComponentFixture<WidgetDate1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetDate1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetDate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
