import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdesComponent } from './productdes.component';

describe('ProductdesComponent', () => {
  let component: ProductdesComponent;
  let fixture: ComponentFixture<ProductdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
