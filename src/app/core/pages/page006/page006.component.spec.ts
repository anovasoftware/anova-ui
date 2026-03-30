import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page006Component } from './page006.component';

describe('Page006Component', () => {
  let component: Page006Component;
  let fixture: ComponentFixture<Page006Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page006Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
