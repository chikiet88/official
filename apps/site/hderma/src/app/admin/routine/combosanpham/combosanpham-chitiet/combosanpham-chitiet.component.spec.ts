/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CombosanphamChitietComponent } from './combosanpham-chitiet.component';

describe('CombosanphamChitietComponent', () => {
  let component: CombosanphamChitietComponent;
  let fixture: ComponentFixture<CombosanphamChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombosanphamChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombosanphamChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
