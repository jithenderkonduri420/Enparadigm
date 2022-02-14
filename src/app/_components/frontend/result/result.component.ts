import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../_service/api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "frontend-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class FrontEndResultComponent implements OnInit {
  surveyDetails: any;
  loading = false;
  submitted = false;
  quizForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      organization: ["", Validators.required],
      location: ["", Validators.required],
    });

    if (localStorage.getItem("surveyDetails") !== null) {
      this.surveyDetails = JSON.parse(
        localStorage.getItem("surveyDetails") || "{}"
      );
    } else {
      this.router.navigate(["/"]);
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.quizForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.quizForm.invalid) {
      return;
    }
    this.surveyDetails['questionnaires'] = this.surveyDetails;
    this.surveyDetails['name'] = this.quizForm.value.name;
    this.surveyDetails['email'] = this.quizForm.value.email;
    this.surveyDetails['organization'] = this.quizForm.value.organization;
    this.surveyDetails['location'] = this.quizForm.value.location;
    this.apiService
    .create('survey', this.surveyDetails)
    .pipe(first())
    .subscribe(
      (data) => {
        localStorage.removeItem('surveyDetails');
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
