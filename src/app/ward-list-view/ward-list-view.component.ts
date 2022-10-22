import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Ward} from "../models/ward.model";
import {WardService} from "../services/ward.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-list-view',
  templateUrl: './ward-list-view.component.html',
  styleUrls: ['./ward-list-view.component.css']
})
export class WardListViewComponent implements OnInit {

  public ward: Ward[];
  public editWard: Ward;
  public deleteWard: Ward;

  constructor(private wardService: WardService) { }

  ngOnInit(): void {
    this.getWards();
  }

  public getWards(): void {
    this.wardService.getWards().subscribe(
      (response: Ward[]) => {
        this.ward = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddWard(addForm: NgForm): void {
    document.getElementById('ward-close-button').click();
    this.wardService.addWard(addForm.value).subscribe(
      (response: Ward) => {
        this.getWards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addForm.reset();
  }

  public onOpenModalWards(ward: Ward, mode: string): void {
    const container = document.getElementById('main-container-ward')
    const buttonWard = document.createElement('button');
    buttonWard.type = 'button';
    buttonWard.style.display = 'none';
    buttonWard.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonWard.setAttribute("data-bs-target", '#addWardModal');
    }
    if (mode === 'edit') {
      this.editWard = ward;
      buttonWard.setAttribute("data-bs-target", '#editWardModal');
    }
    if (mode === 'delete') {
      this.deleteWard = ward;
      buttonWard.setAttribute("data-bs-target", '#deleteWardModal');
    }

    container.appendChild(buttonWard);
    buttonWard.click();
  }

  public onUpdateWard(editForm: NgForm): void {
    document.getElementById('updated-ward-close-button').click();
    this.wardService.addWard(editForm.value).subscribe(
      (response: Ward) => {
        this.getWards();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteWard(wardId: string): void {
    document.getElementById('delete-modal-close').click();
    this.wardService.deleteWard(wardId).subscribe(
      (response: void) => {
        this.getWards();
      },
      (error: HttpErrorResponse) => {

      }
    );
  }
}
