import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class EmailService {

  validarEmail(control: FormControl): { [s: string]: boolean } {
    let email = control.value;
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(email)) {
      //console.log('email valido');
      return null;
    } else {
      //console.log('email invalido');
      return {
        validarEmail: false
      }
    }
  }
  
}