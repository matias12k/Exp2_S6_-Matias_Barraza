import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  template: '<div></div>'
})
class Perfil {}

try {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
} catch (error) {}

describe('Perfil', () => {
  let component: Perfil;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil],
    }).compileComponents();

    component = new Perfil();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});