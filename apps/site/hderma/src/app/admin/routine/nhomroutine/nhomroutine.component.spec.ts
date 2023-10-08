/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhomroutineComponent } from './nhomroutine.component';

describe('NhomroutineComponent', () => {
  let component: NhomroutineComponent;
  let fixture: ComponentFixture<NhomroutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomroutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomroutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
