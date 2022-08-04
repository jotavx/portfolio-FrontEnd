import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { socialmedia } from 'src/app/model/socialmedia';
import { SocialmediaService } from 'src/app/service/socialmedia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  public socialmedia: socialmedia[];
  public deleteSocialMedia: socialmedia;
  public editSocialMedia: socialmedia;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    public socialmediaService: SocialmediaService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.socialmediaService.getSocialMedia().subscribe((data) => {
      this.socialmedia = data;
    });
    this.getSocialMedia();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login']);
  }

  public onDeleteSocialMedia(id: number): void {
    this.socialmediaService.deleteSocialMedia(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSocialMedia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditSocialMedia(socialmedia: socialmedia): void {
    this.socialmediaService.editSocialMedia(socialmedia).subscribe(
      (response: socialmedia) => {
        console.log(response);
        this.getSocialMedia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateSocialMedia(addForm: NgForm): void {
    document.getElementById('#addSocialMediaModal')?.click();
    this.socialmediaService.createSocialMedia(addForm.value).subscribe(
      (response: socialmedia) => {
        console.log(response);
        this.getSocialMedia();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public getSocialMedia() {
    this.socialmediaService.getSocialMedia().subscribe((data) => {
      this.socialmedia = data;
    });
  }

  public onOpenModal(socialmedia: socialmedia, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSocialMediaModal');
    }
    if (mode === 'delete') {
      this.deleteSocialMedia = socialmedia;
      button.setAttribute('data-target', '#deleteSocialMediaModal');
    }
    if (mode === 'edit') {
      this.editSocialMedia = socialmedia;
      button.setAttribute('data-target', '#editSocialMediaModal');
    }
    container.appendChild(button);
    button.click();
  }
}
