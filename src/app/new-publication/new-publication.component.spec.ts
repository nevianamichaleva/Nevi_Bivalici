/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewPublicationComponent } from './new-publication.component';

describe('NewPublicationComponent', () => {
  let component: NewPublicationComponent;
  let fixture: ComponentFixture<NewPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
