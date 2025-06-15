import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaList } from './fatura-list';

describe('FaturaList', () => {
  let component: FaturaList;
  let fixture: ComponentFixture<FaturaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
