import {Component, OnInit} from '@angular/core';
import {PersonDetail} from "../../models/person-detail";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../../shared/services/people.service";


@Component({
  selector: 'app-person-detail',
  templateUrl: 'person-detail.component.html',
  styleUrls: ['person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: PersonDetail;
  link: string = "/person/";
  linkAllWorks: string = "/combined_credits";

  constructor(private _route: ActivatedRoute,
              private _peopleService: PeopleService,
              private router: Router) { }

  ngOnInit() {
    let id = +this._route.snapshot.params['id'];
    this._peopleService.getPerson(this.link , id)
      .mergeMap(
        (person: any) => {
          this.person = new PersonDetail(person);
          return this._peopleService.getAllWorks(this.link , id, this.linkAllWorks)
        }
      )
      .subscribe((response: any) => {
        this.person.setPersonJobs(response);
      });

  }

  DetermineGender (gender: number) {
    if (gender) {
      return gender === 1 ? 'female' : 'male';
    } else {
      return '-';
    }
  }



  goTo(id, title?) {
    if (title) {
      this.router.navigate(['movie', id]);
    } else {
      this.router.navigate(['tv', id]);
    }

  }
}
