import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page008Component } from './page008.component';

describe('Page008Component', () => {
  let component: Page008Component;
  let fixture: ComponentFixture<Page008Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page008Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
