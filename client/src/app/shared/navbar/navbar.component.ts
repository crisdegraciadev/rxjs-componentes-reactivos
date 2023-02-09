import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  color: ThemePalette = 'primary';
}
