import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraForm } from './operadora-form';

describe('OperadoraForm', () => {
  let component: OperadoraForm;
  let fixture: ComponentFixture<OperadoraForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadoraForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoraForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
