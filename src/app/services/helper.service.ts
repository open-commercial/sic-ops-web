import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Ubicacion } from '../models/ubicacion';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  static getQueryString(terminos: {}) {
    const qsArray = [];
    for (const value in terminos) {
      if (terminos.hasOwnProperty(value)) {
        qsArray.push(value + '=' + encodeURIComponent(terminos[value]));
      }
    }
    return qsArray.join('&');
  }

  static getUnixDateFromNgbDate(dateObj: NgbDate): number {
    if (!dateObj) { return null; }
    return moment({ year: dateObj.year, month: dateObj.month - 1, day: dateObj.day }).unix();
  }

  static getFormattedDateFromNgbDate(dateObj: NgbDate): string {
    if (!dateObj) { return ''; }
    return [dateObj.day, dateObj.month, dateObj.year ].join('/');
  }

  static formatNumFactura(nSerie: number, nFac: number) {
    return ('000' + nSerie).slice(-4) + '-' + ('0000000' + nFac).slice(-8);
  }

  static formatUbicacion(u: Ubicacion) {
    if (!u) { return ''; }
    const arr = [];
    arr.push(u.calle ? u.calle : '');
    arr.push(u.numero ? u.numero : '');
    arr.push(u.piso ? u.piso : '');
    arr.push(u.departamento ? u.departamento : '');
    arr.push(u.nombreLocalidad ? u.nombreLocalidad : '');
    arr.push(u.nombreProvincia ? u.nombreProvincia : '');
    return arr.join(' ');
  }

  constructor() {}
}
