import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ParentFormComponent } from './components/parent-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppComponent, ParentFormComponent],
  template: `
    <section
      class="bg-slate-100 py-10 h-screen grid grid-cols-[1fr,min(80vw,700px),1fr]"
    >
      <parent-form class="col-start-2" />
    </section>
  `
})
export class AppComponent {}
