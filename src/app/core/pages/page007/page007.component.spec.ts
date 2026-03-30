import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page007Component } from './page007.component';

describe('Page007Component', () => {
  let component: Page007Component;
  let fixture: ComponentFixture<Page007Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page007Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page007Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
