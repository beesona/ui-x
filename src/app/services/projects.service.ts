import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from '../models/project';
import { PROJECTS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return of(PROJECTS).pipe(
      tap(_ => console.log(`found projects matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchHeroes', []))
    );
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
