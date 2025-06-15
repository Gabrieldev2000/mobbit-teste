import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraList } from './operadora-list';

describe('OperadoraList', () => {
  let component: OperadoraList;
  let fixture: ComponentFixture<OperadoraList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadoraList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadoraList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
