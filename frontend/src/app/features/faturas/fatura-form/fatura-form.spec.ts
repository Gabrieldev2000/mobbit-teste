import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaForm } from './fatura-form';

describe('FaturaForm', () => {
  let component: FaturaForm;
  let fixture: ComponentFixture<FaturaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
