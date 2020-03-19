import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// json
import * as instructivo from '../lenguages/spanish/home/instructive.json';
import * as instructive from '../lenguages/english/home/instructive.json';

// import * as graficos from '../lenguages/spanish/home/instructive.json';
// import * as dashboard from '../lenguages/english/home/instructive.json';


@Injectable({
    providedIn: 'root'
})

export class LenguageService {
    idioma = 'spanish';
    json: any;

    constructor(public router: Router, public httpClient: HttpClient) { }

    getInstructivo() {
        if (localStorage.getItem('Idioma')) {
            this.idioma = localStorage.getItem('Idioma');
        }
        if (this.idioma == 'spanish') { return (instructivo as any).default; } else { return (instructive as any).default; }
    }

    getDashboard() {
        if (localStorage.getItem('Idioma')) {
            this.idioma = localStorage.getItem('Idioma');
        }
        // if (this.idioma == 'spanish') { return (graficos as any).default; } else { return (dashboard as any).default; }
    }
}
