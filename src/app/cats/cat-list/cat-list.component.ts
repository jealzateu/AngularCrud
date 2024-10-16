import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from 'src/app/models/cat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit {

  cats: Cat[] = [];

  constructor(private catService: CatService, private router: Router) {}

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.cats = this.catService.getCats();
    if(!this.cats.length) {
      this.catService.fetchCatsFromApi().subscribe(cats => {
        this.cats = cats;
      });
    }
  }

  deleteCat(id: string): void {
    this.catService.deleteCat(id);
    this.loadCats();
  }

  createCat(): void {
    this.router.navigate(['/cats/create']);
  }

  editCat(id: string): void {
    this.router.navigate(['/cats/edit', id]);
  }

  resetCats(): void {
    this.catService.resetCats();
    this.loadCats();
  }
}
