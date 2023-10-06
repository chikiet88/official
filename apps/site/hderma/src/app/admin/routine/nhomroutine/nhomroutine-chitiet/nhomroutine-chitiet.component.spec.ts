/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhomroutineChitietComponent } from './nhomroutine-chitiet.component';

describe('NhomroutineChitietComponent', () => {
  let component: NhomroutineChitietComponent;
  let fixture: ComponentFixture<NhomroutineChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomroutineChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomroutineChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
