import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Infracao } from 'src/app/models/infracao';
import { InfracoesService } from "src/app/services/infracoes.service";

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  ELEMENT_DATA: Infracao[] = [];
  displayedColumns: string[] = ['placa', 'velocidade', 'data', 'classeVeiculo'];
  dataSource = new MatTableDataSource<Infracao>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: InfracoesService) { }

  ngOnInit(): void {
    this.findAll();
  }

  selected = '';

  carro: number;
  moto: number;
  caminhao: number;

  placa: string;
  velocidade: number;
  classe: string;

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.contarClasses(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<Infracao>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  limpar(){
    this.placa = "";
    this.selected = "";
    this.velocidade= 0;
    this.classe = ""; 
  }

  filtrar(){
    this.service.filtrar(this.placa, this.velocidade, this.classe = this.selected).subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.contarClasses(this.ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<Infracao>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(this.carro);
    });
  }

  contarClasses(lista: Infracao[]) {
    this.carro = 0;
    this.moto = 0;
    this.caminhao = 0;
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].classeVeiculo == 'CARRO') {
        this.carro++;
      } else if (lista[i].classeVeiculo === 'MOTO') {
        this.moto++;
      } else if (lista[i].classeVeiculo === 'CAMINHAO') {
        this.caminhao++;
      }
    }
  }
  


}

