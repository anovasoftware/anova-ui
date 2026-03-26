import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page005Component } from './page005.component';

describe('Page005Component', () => {
  let component: Page005Component;
  let fixture: ComponentFixture<Page005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page005Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
