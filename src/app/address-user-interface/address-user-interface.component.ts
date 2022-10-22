import { Component, OnInit } from '@angular/core';
import {Address} from "../models/address.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AddressService} from "../services/address.service";
import {NgForm} from "@angular/forms";
import {Patient} from "../models/patient.model";
import {PatientService} from "../services/patient.service";

@Component({
  selector: 'app-address-user-interface',
  templateUrl: './address-user-interface.component.html',
  styleUrls: ['./address-user-interface.component.css']
})
export class AddressUserInterfaceComponent implements OnInit {

  public addresses: Address[];
  public deleteAddress: Address;
  public editAddress: Address;
  public patientsList: Patient[];

  constructor(private addressService: AddressService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.getAddresses();
    this.getPatients();
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patientsList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getAddresses(): void {
    this.addressService.getAddresses().subscribe(
      (response: Address[]) => {
        this.addresses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddAddress(addAddressForm: NgForm): void {
    document.getElementById('address-close-button').click();
    this.addressService.addAddress(addAddressForm.value).subscribe(
      (response: Address) => {
        this.getAddresses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addAddressForm.reset();
  }


  public onOpenModalAddresses(address: Address, mode: string): void {
    const container2 = document.getElementById('main-container-address')
    const buttonAddress = document.createElement('button');
    buttonAddress.type = 'button';
    buttonAddress.style.display = 'none';
    buttonAddress.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonAddress.setAttribute("data-bs-target", '#addAddressModal');
    }
    if (mode === 'edit') {
      this.editAddress = address;
      buttonAddress.setAttribute("data-bs-target", '#editAddressModal');
    }
    if (mode === 'delete') {
      this.deleteAddress = address;
      buttonAddress.setAttribute("data-bs-target", '#deleteAddressModal');
    }

    container2.appendChild(buttonAddress);
    buttonAddress.click();
  }


  public onDeleteAddress(addressId: string): void {
    document.getElementById('delete-address-modal-close').click();
    this.addressService.deleteAddress(addressId).subscribe(
      (response: void) => {
        this.getAddresses();
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  public onUpdateAddress(editAddressForm: NgForm): void {
    document.getElementById('updated-address-close-button').click();
    this.addressService.addAddress(editAddressForm.value).subscribe(
      (response: Address) => {
        this.getAddresses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

}
