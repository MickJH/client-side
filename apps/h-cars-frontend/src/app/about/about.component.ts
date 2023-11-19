import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-side-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit{
    imagePath?: string;

  ngOnInit(): void {
      this.imagePath = '../../assets/H-Cars_ERD.png';
  }
}
