import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BusService } from 'src/app/service/bus.service';

@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.scss']
})
export class CreateBusComponent {
  registrationForm!: FormGroup;
  public isUpdateActive: boolean = false;
  constructor(private fb: FormBuilder, private api: BusService, private toastService: NgToastService, private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      unitnumber: [''],
      licenseplate: [''],
      model: [''],
      year: [''],
      capacity: [''],
      carrier: [''],
    });
  }

  submit() {
    this.api.postBus(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Bus registrado', duration: 3000 });
        this.registrationForm.reset();
      });
  }
}
