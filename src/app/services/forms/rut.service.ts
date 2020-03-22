
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class RutService {
  validaRut(control: FormControl): { [s: string]: boolean } {
    let rutCompleto = control.value;
    // Despejar Puntos
    var valor = rutCompleto.replace(/[.]/g, "");
    // Despejar Guión
    valor = valor.replace(/[-]/g, "");

    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rutCompleto = cuerpo + '-' + dv
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { /*rut.setCustomValidity("RUT Incompleto");*/
      return {
        validaRut: true
      }
    }
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * valor.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { /*rut.setCustomValidity("RUT Inválido");*/
      return {
        validaRut: true
      }
    }
    // Si todo sale bien, eliminar errores (decretar que es válido)
    //rut.setCustomValidity('');
    return null;
  }

  formateaRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
      var sinPuntos = actual.replace(/\./g, "");
      var actualLimpio = sinPuntos.replace(/-/g, "");
      var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      var rutPuntos = "";
      var i = 0;
      var j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        var letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rutPuntos = "." + rutPuntos;
        }
        j++;
      }
      var dv = actualLimpio.substring(actualLimpio.length - 1);
      return rutPuntos + "-" + dv;
    }
    return rut
  }
}