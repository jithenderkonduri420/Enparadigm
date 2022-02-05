import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../_service/api.service"
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'frontend-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class FrontEndDashboardComponent implements OnInit {
 
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) {}

  ngOnInit(): void {
  }
 }
