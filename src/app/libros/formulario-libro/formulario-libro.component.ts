import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Libro } from 'src/app/interfaces/libro.interface';
import { LibrosService } from 'src/app/servicios/libros.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {

  codigo: number | null = null;
  titulo: string | null = null;
  autor: string | null = null;
  paginas: number | null = null;

  codigoValido: boolean = true;
  tituloValido: boolean = true;
  autorValido: boolean = true;
  paginasValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  @Output()
  recargarLibros: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioLibros: LibrosService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    this.validar();
    if(this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido){
      //Construimos el objeto libro para enviar al servidor
      const libro: Libro = {
        id: this.codigo,
        titulo: this.titulo,
        autor: this.autor,
        paginas: this.paginas 
      }
      //Enviamos el objeto al servidor mediante el método POST del servicio
      this.guardando = true;
      this.servicioLibros.post(libro).subscribe({
        next: () => {
          this.guardando = false;
          this.mensajes = [{severity: 'success', summary: 'Éxito', detail: 'Se registró el libro.'}];
          this.recargarLibros.emit(true);
        },
        error: (e) => {
          this.guardando = false;
          this.mensajes = [{severity: 'error', summary: 'Érror al registrar', detail: e.error}];
        }
      });
    }
  }

  validar(){

    this.codigoValido = this.codigo !== null;
    this.tituloValido = this.titulo !== null && this.titulo?.length > 0;
    this.autorValido = this.autor !== null && this.autor?.length > 0;
    this.paginasValido = this.paginas !== null;

    /* También puede ser así
    if(this.codigo === null){
      this.codigoValido = false;
    }else{
      this.codigoValido = true;
    }*/
  }

  limpiarFomrs(){
    this.codigo = null;
    this.titulo = null;
    this.autor = null;
    this.paginas = null;

    this.codigoValido = true;
    this.tituloValido = true;
    this.autorValido = true;
    this.paginasValido = true;

    this.mensajes = []; 

  }

}
