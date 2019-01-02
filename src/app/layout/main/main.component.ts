import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

//model objects
import { Library } from '../../models/library';
import { Project } from '../../models/project';

//services
import { LibraryService } from '../../services/library.service';

//TODO: this refactors out to a project search component
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  langCollection: string[] = ['Any Language'];
  libCollection: string[] = ['Any Library/Framework'];
  versionCollection: string[] = ['Any Version'];
  select1: string = 'Any Language';
  select2: string = 'Any Library/Framework';
  select3: string = 'Any Version';
  libraries: Library[];

  //TODO: this refactors out to a project search component
  private searchTerms = new Subject<string>();
  projects$: Observable<Project[]>;

  projects: Project[];
  filteredProjects: Project[];

  constructor(private _libSvc: LibraryService, private _projSvc: ProjectsService) { }

  ngOnInit() {
    this.getLibraries();

    //TODO: this refactors out to a project search component    
    this.projects$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => 
        this._projSvc.searchProjects(term)
      ),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectChange(){

  }

  setUpSelections(libs: Library[]){
    this.libraries = libs;
    (libs).forEach(el => {
      if (this.langCollection.indexOf(el.name) < 0){
        this.langCollection.push(el.name);
      }
    });
  }

  languageSelect(){
    this.libCollection = ['Any Library/Framework'];
    this.versionCollection = ['Any Version'];
    this.select2 = 'Any Library/Framework';
    this.select3 = 'Any Version';
    (this.libraries).forEach(lib => {
      if (lib.name === this.select1){
        if (this.libCollection.indexOf(lib.definition) < 0){
          this.libCollection.push(lib.definition);
        }
      }
    });
    this.selectChange();
  }

  versionSelect(){
    this.versionCollection = ['Any Version'];
    this.select3 = 'Any Version';
    (this.libraries).forEach(lib => {
      if (lib.name === this.select1){
        if (lib.definition === this.select2){
          if (this.versionCollection.indexOf(lib.version) < 0){
            this.versionCollection.push(lib.version);
          }
        }
      }
    });    
    this.selectChange();
  }

  getLibraries(): void {
    this._libSvc.getLibraries()
        .subscribe(libs => this.setUpSelections(libs));
  }
  getProjects(): void {

  }
}
