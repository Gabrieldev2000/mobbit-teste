import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoForm } from './contrato-form';

describe('ContratoForm', () => {
  let component: ContratoForm;
  let fixture: ComponentFixture<ContratoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
