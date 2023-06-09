import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../../api/project';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../api/category';
import { CategoryService } from '../../services/category/category.service';
import { ProjectService } from '../../services/project/project.service';
import { Status } from '../../api/status';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css'],
})
export class CategoriesModalComponent implements OnInit {
  form: UntypedFormGroup;
  category: Category = {};
  editMode: boolean;
  project: Project = {};
  @Input() projectId: number;
  readonly defaultColor = '#292929';
  readonly colorPalette: string[] = [
    '#ffa726',
    '#ec407a',
    '#7e57c2',
    '#3f51b5',
    '#c62828',
    '#03a9f4',
    '#26a69a',
    '#66bb6a',
    '#fbc02d',
    '#ff5722',
    '#795548',
    '#757575',
    '#607d8b',
    this.defaultColor,
  ];
  categoryId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { categoryId: number },
    public dialogRef: MatDialogRef<CategoriesModalComponent>,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.categoryId = data.categoryId;
  }

  ngOnInit(): void {
    this.editMode = this.data.categoryId != null;
    this.buildForm();
    if (this.editMode) {
      this.categoryService
        .getCategory(this.data.categoryId)
        .subscribe((category: Category) => {
          this.category = category;
          this.updateForm();
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.category.name || '', [Validators.required]],
      color: [this.category.color || this.defaultColor],
    });
  }

  saveCategory() {
    this.category.name = this.form.get('name').value;
    this.category.color = this.form.get('color').value;
    if (!this.editMode) {
      this.category.project = { id: this.projectId };
    }
    (this.editMode
      ? this.categoryService.updateCategory(this.category)
      : this.projectService.createCategory(this.projectId, this.category)
    ).subscribe(() => this.dialogRef.close(true));
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.category?.name);
    if (this.category.color) {
      this.form.get('color').setValue(this.category.color);
    }
  }
}
