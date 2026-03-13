import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTextareaComponent } from './widget-textarea.component';

describe('WidgetTextareaComponent', () => {
  let component: WidgetTextareaComponent;
  let fixture: ComponentFixture<WidgetTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
