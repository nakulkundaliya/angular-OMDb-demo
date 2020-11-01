import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post;
  @Input() index;
  @Output() hideDetails:any = new EventEmitter();
  @Output() gotoDetails:any = new EventEmitter();
}
