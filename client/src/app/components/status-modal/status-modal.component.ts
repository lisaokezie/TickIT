import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from 'src/app/api/status';
import { ProjectService } from 'src/app/services/project/project.service';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css'],
})
export class StatusModalComponent implements OnInit {
  form: UntypedFormGroup;
  editMode: boolean;
  status: Status = {};
  icons: Icon[] = [
    { value: '', label: '--' },
    { value: 'task_alt', label: 'task' },
    { value: 'emoji_objects', label: 'idea' },
    { value: 'rocket', label: 'rocket' },
    { value: 'rotate_right', label: 'progress' },
    { value: 'favorite', label: 'favorite' },
    { value: 'report', label: 'report' },
    { value: 'work', label: 'work' },
  ];
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

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: number; statusId: number },
    public dialogRef: MatDialogRef<StatusModalComponent>,
    private statusService: StatusService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editMode = this.data.statusId != null;
    this.buildForm();
    if (this.editMode) {
      this.statusService
        .getStatus(this.data.statusId)
        .subscribe((status: Status) => {
          this.status = status;
          this.updateForm();
        });
    }
  }

  confirm() {
    this.status.name = this.form.get('name').value;
    this.status.color = this.form.get('color').value;
    this.status.icon = this.form.get('icon').value;
    (this.editMode
      ? this.statusService.updateStatus(this.status)
      : this.projectService.createStatusForProject(
          this.data.projectId,
          this.status
        )
    ).subscribe(() => this.dialogRef.close(true));
  }

  deleteStatus() {
    this.statusService
      .deleteStatus(this.status.id)
      .subscribe(() => this.dialogRef.close(true));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.status?.name || '', Validators.required],
      color: [this.status.color || this.defaultColor],
      icon: [this.status?.icon || ''],
    });
  }

  private updateForm(): void {
    this.form.get('name').setValue(this.status?.name);
    if (this.status.color) {
      this.form.get('color').setValue(this.status.color);
    }
    if (this.status.icon) {
      this.form.get('icon').setValue(this.status.icon);
    }
  }
}

interface Icon {
  value: string;
  label: string;
}
