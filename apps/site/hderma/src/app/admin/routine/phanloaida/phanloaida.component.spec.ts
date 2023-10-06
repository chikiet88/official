/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhanloaidaComponent } from './phanloaida.component';

describe('PhanloaidaComponent', () => {
  let component: PhanloaidaComponent;
  let fixture: ComponentFixture<PhanloaidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanloaidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanloaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
