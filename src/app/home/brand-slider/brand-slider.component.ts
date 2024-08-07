import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-slider',
  standalone: true,
  imports: [],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css'
})
export class BrandSliderComponent {
  brands: string[] = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
}
