import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page011Component } from './page011.component';

describe('Page011Component', () => {
  let component: Page011Component;
  let fixture: ComponentFixture<Page011Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page011Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page011Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
