/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CombosanphamComponent } from './combosanpham.component';

describe('CombosanphamComponent', () => {
  let component: CombosanphamComponent;
  let fixture: ComponentFixture<CombosanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombosanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombosanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
