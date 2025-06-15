import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoList } from './contrato-list';

describe('ContratoList', () => {
  let component: ContratoList;
  let fixture: ComponentFixture<ContratoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
