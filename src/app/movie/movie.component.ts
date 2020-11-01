import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AppService } from '../app.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  history_key = 'search_history';

  movies: any = [];
  searchFormControl = new FormControl();
  value: any;
  msg = '';
  isDone = false;
  constructor(private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {
      if (param['value']) {
        this.value = param['value'];
        this.appService.searchText = this.value;
        this.refresh();
      }
    });
   }

  ngOnInit() {
  }

  refresh() {
    this.appService.getMovies(this.value).subscribe(data => {
      if (data.Response !== 'False') {
        const items = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            items.push(data[key]);
          }
        }
        this.msg = `Showing results for ${this.value} ...`;
        this.movies = items[0];
        this.isDone = true;
      } else {
        this.isDone = true;
        this.movies.length = null;
        if (this.value === '') {
          this.msg = `Please enter something to search for!`;
        } else {
          this.msg = `Oh no! Could not find any related movies to ${this.value}!`;
        }
      }
    })
  }


  gotoDetails(movieData) {
      this.appService.getDetails(movieData.id).subscribe(data => {
        this.movies[movieData.index].detail = data;
      });
  }
  hideDetails(index){
    this.movies[index].detail = undefined;
  }
}
