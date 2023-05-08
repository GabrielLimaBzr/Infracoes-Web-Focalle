import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Infracao } from '../models/infracao';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InfracoesService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Infracao[]> {
    const url = `infracao/retornarInfracoes`;
    return this.http.get<Infracao[]>(url);
  }

  filtrar(placa: string, velocidade: number, classe: string): Observable<Infracao[]> {
    let params: any = {};
    const url = `infracao/filtrar`;
    if (placa) {
      params.placa = placa;
    }
    if (velocidade) {
      params.velocidade = velocidade;
    }
    if (classe) {
      params.classeVeiculo = classe;
    }
    return this.http.get<Infracao[]>(url, { params: params });
  }

}
