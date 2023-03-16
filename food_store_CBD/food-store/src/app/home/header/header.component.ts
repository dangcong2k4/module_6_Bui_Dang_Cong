import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value = 0;

  constructor() { }

  ngOnInit(): void {
  }
  choice(id: number) {
    this.value = id;
  }
}
