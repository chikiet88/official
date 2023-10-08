/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CombosanphamDieukienComponent } from './combosanpham-dieukien.component';

describe('CombosanphamDieukienComponent', () => {
  let component: CombosanphamDieukienComponent;
  let fixture: ComponentFixture<CombosanphamDieukienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombosanphamDieukienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombosanphamDieukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
