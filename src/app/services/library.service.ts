import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Library } from '../models/library';
import { LIBRARIES } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  getLibraries(): Observable<Library[]> {
    return of(LIBRARIES);
  }
}
