import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  langCollection: object[] = [];
  libCollection: object[] = [];
  versionCollection: object[] = [];
  select3: string = 'Any Version';
  select2: string = '.Net Framework';
  select1: string = '.Net';
  constructor() { }

  ngOnInit() {
    this.langCollection = [
      {name: '.Net'},
      {name: 'Java'},
      {name: 'Python'}
    ];
    this.libCollection = [
      {name: '.Net Framework', langName: '.Net'},
      {name: '.Net Core', langName: '.Net'},
      {name: 'JDK', langName: 'Java'},
      {name: 'J2SE', langName: 'Java'},
      {name: 'SE', langName: 'Java'},
      {name: 'v1', langName: 'Python'},
      {name: 'v2', langName: 'Python'},
      {name: 'v3', langName: 'Python'}
    ];
    this.versionCollection = [
      {name: '4.6.0', libName: '.Net Framework'},
      {name: '4.6.1', libName: '.Net Framework'},
      {name: '4.6.2', libName: '.Net Framework'},
      {name: '4.6.2', libName: 'JDK'},
      {name: '4.6.2', libName: 'J2SE'},
      {name: '4.6.2', libName: 'SE'},
      {name: '4.6.2', libName: 'v1'},
    ]
  }

}
