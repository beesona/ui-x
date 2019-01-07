import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from '../../../node_modules/rxjs';
import { switchMap } from 'rxjs/operators';
import { Project } from '../models/project';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  @Input() doc: Document;
  docId: number = -1;
  project$: Observable<Project>;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private projSvc: ProjectsService) { }

  ngOnInit() {

    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.projSvc.getProject(params.get('docId'))
      )
    );
  }

  goBack(){
      this.router.navigate(['/']);
  }
}
