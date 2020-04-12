import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { UnityProgress } from '../unity-loader/UnityProgress.js';
import { UnityLoader } from '../unity-loader/UnityLoader.js';

declare let window: any;

@Injectable()
export class UnityService implements OnInit {
  private gameInstance: any;
  public flag = false;
  // private url = 'http://localhost:8000/api/ejercicios';
  private url = `${environment.apiBaseUrl}`+ '/ejercicios';

  constructor() { }

  ngOnInit() { }

  public load(componentId: string, path) {
    window['UnityLoader'] = UnityLoader;
    window['UnityProgress'] = UnityProgress;
    window['receiveMessageFromUnity'] = this.receiveMessageFromUnity;
    window['sendMessageToUnity'] = this.sendMessageToUnity;
    this.gameInstance = UnityLoader.instantiate(componentId, "../../../assets/activities/" + path);
    //window['gameInstance'] = this.gameInstance
  }

  public sendMessage(messageHandler: string, message: any) {
    this.gameInstance.SendMessage(messageHandler, message.type, JSON.stringify(message.payload));
  }

  public send() {
    //objectName: string, methodName: string, messageValue: string
    this.gameInstance.SetFullscreen(true);
    
  }

  public receiveMessageFromUnity(messageValue: string) {
    if (messageValue == "salir") {
      //this.modalService.dismissAll();
      window.location.reload();
    } else if (messageValue == "true") {
      console.log('recibido');
      document.getElementById('btnGhost').click();
      //console.log("mensaje Enviado");
    } else if (messageValue === "fullscreen") {
      console.log('fullscreen...')
      //console.log(this.gameInstance)
      //this.gameInstance.SetFullscreen(true);
    }
  }

  public sendMessageToUnity(objectName, methodName, mensajeString) {
    console.log("enviando mensaje");
  }

  public exitFullScreen() {
    //objectName: string, methodName: string, messageValue: string
    this.gameInstance.SetFullscreen(false);
  }

  public StopGame() {
    this.gameInstance.StopGame();
  }

  public alert() {
    var messageValueJson =
      {
        "nombre": localStorage.getItem('studentName'),
        "estudiante_id": localStorage.getItem('idEstudiante'),
        "sexoEstudiante": "?",
        "bloque_id": localStorage.getItem('fastBloque'),
        "rutaApi": this.url
      };
      var mensajeString = JSON.stringify(messageValueJson);
      //this.gameInstance.SendMessage();
      this.gameInstance.SendMessageUnity('VariablesController', 'obtenerValores', mensajeString);
  }


  public alertMobile( studentName, idEstudiante, idBloque ) {
    var messageValueJson =
      {
        "nombre": studentName,
        "estudiante_id": idEstudiante,
        "sexoEstudiante": "?",
        "bloque_id": idBloque,
        "rutaApi": this.url
      };

    var mensajeString = JSON.stringify(messageValueJson);
    this.gameInstance.SendMessageUnity('VariablesController', 'obtenerValores', mensajeString);
  }
}
