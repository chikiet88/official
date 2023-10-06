/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhanloaidaChitietComponent } from './phanloaida-chitiet.component';

describe('PhanloaidaChitietComponent', () => {
  let component: PhanloaidaChitietComponent;
  let fixture: ComponentFixture<PhanloaidaChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanloaidaChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanloaidaChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
