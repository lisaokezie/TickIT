import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogoutComponent } from '../logout/logout.component';
import { TokenStorageService } from '../../services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  projects: Project[];
  isSidenavOpen = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  protected readonly LogoutComponent = LogoutComponent;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenStorage: TokenStorageService,
    public router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.userService
      .getUserProjects(this.tokenStorage.getCurrentUserId())
      .subscribe((projects: Project[]) => (this.projects = projects));
  }

  isLoggedIn() {
    this.tokenStorage.isLoggedIn();
  }

  navigateUser() {
    this.router.navigate(['user']);
  }

  navigateDashboard() {
    this.router.navigate(['dashboard']);
  }

  openEditProjectModal() {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      height: '400px',
      width: '500px',
      data: { projectId: null },
    });

    dialogRef.afterClosed().subscribe((successful: boolean) => {
      if (successful) {
        this.fetchProjects();
      }
    });
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
