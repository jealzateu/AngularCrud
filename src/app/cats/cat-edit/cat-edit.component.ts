import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.scss']
})
export class CatEditComponent implements OnInit {

  catForm: FormGroup;
  isEditMode = false;
  catId!: string;

  constructor(
    private fb: FormBuilder,
    private catService: CatService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.catForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.catId = params['id'];
      if (this.catId) {
        this.isEditMode = true;
        this.loadCatData();
      }
    });
  }

  initializeForm() {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      origin: ['', Validators.required],
      temperament: ['', Validators.required]
    });
  }

  loadCatData() {
    const cat = this.catService.getCatById(this.catId);
    if (cat) {
      this.catForm.patchValue({
        name: cat.breeds[0].name,
        url: cat.url,
        origin: cat.breeds[0].origin,
        temperament: cat.breeds[0].temperament
      });
    }
  }

  onSubmit() {
    const catData: Cat = {
      id: this.catId || this.generateId(),
      breeds: [{ 
        name: this.catForm.value.name, 
        origin: this.catForm.value.origin, 
        temperament: this.catForm.value.temperament
      }],
      url: this.catForm.value.url
    };

    if (this.isEditMode) {
      this.catService.updateCat(catData);
    } else {
      this.catService.addCat(catData);
    }

    this.router.navigate(['/cats']);
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  onCancel() {
    this.router.navigate(['/cats']);
  }
}
