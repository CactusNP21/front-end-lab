import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [
    trigger('visibility', [
      state('fade-in', style(
        {opacity: 0}
      )),
      state('fade-out', style(
        {opacity: 1}
      )),
      transition('fade-in <=> fade-out', [
        animate('0.3s')
      ]),
    ]),
    trigger('reverseSun', [
      state('right', style(
        {transform: 'translateX(-100%)'},
      )),
      state('left', style(
        {transform: 'translateX(0%)'}
      )),
      transition('right <=> left', [
        animate('0.3s ease-in')
      ]),
    ]),
    trigger('sunPosition', [
      state('high', style(
        {transform: 'translateY(-80%)'}
      )),
      state('down', style(
        {transform: 'translateY(0)'}
      )),
      transition('high <=> down', [
        animate('0.5s ease-in',)
      ]),
    ]),

    trigger('reverseForm', [

      state('right', style(
        {transform: 'translateX(100%)'},
      )),
      state('left', style(
        {transform: 'translateX(0%)'}
      )),
      transition('right <=> left', [
        animate('0.5s ease-in')
      ]),
    ]),
    trigger('fade', [])
  ]
})
export class AuthenticationComponent implements OnInit {
  isRegister = false
  isFaded = false
  isChangedPosition = true

  constructor() {
  }

  trigger() {
    this.isRegister = !this.isRegister
    setTimeout(() => {
      this.isFaded = !this.isFaded
    }, 300)
    setTimeout(() => {
      this.isRegister = !this.isRegister
    }, 700)
  }


  ngOnInit(): void {



  }

}
