import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'client-side-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
})
export class ProtectedComponent {}
