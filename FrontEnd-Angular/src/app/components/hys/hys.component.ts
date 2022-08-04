import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { skills } from 'src/app/model/skills.model';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css'],
})
export class HysComponent implements OnInit {
  public skills: skills[];
  public editSkills: skills;
  public deleteSkills: skills;
  roles: string[];
  isAdmin: boolean = false;

  constructor(
    public skillsService: SkillsService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe((data) => {
      this.skills = data;
    });
    this.getSkills();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public onEditSkills(skills: skills): void {
    this.skillsService.editSkills(skills).subscribe(
      (response: skills) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSkills(id: number): void {
    this.skillsService.deleteSkills(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateSkills(addForm: NgForm): void {
    document.getElementById('#addSkillsModal')?.click();
    this.skillsService.createSkills(addForm.value).subscribe(
      (response: skills) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public getSkills() {
    this.skillsService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  public onOpenModal(skills: skills, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillsModal');
    }
    if (mode === 'delete') {
      this.deleteSkills = skills;
      button.setAttribute('data-target', '#deleteSkillsModal');
    }
    if (mode === 'edit') {
      this.editSkills = skills;
      button.setAttribute('data-target', '#editSkillsModal');
    }
    container.appendChild(button);
    button.click();
  }
}
