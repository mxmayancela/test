import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CarrierService } from 'src/app/service/carrier.service';

@Component({
  selector: 'app-create-carrier',
  templateUrl: './create-carrier.component.html',
  styleUrls: ['./create-carrier.component.scss']
})
export class CreateCarrierComponent implements OnInit{
  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  constructor(private fb: FormBuilder, private api: CarrierService, private toastService: NgToastService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: [''],
      lastnamefather: [''],
      lastnamemother: [''],
      cedula: [''],
      birthdate: [''],
      license: [''],
    });
  }

  submit() {
    this.api.postCarrier(this.registrationForm.value)
      .subscribe(
        res => {
          this.toastService.success({ detail: 'SUCCESS', summary: 'Conductor registrado', duration: 3000 });
          this.registrationForm.reset();
        },
        error => {
          console.error('Error al registrar el conductor:', error);
          this.toastService.error({ detail: 'ERROR', summary: 'Error en la validación de datos', duration: 3000 });
        }
      );
  }

}
