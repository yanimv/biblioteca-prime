import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { Autor } from 'src/app/interfaces/autor.interface';
import { Libro } from 'src/app/interfaces/libro.interface';
import { AutoresService } from 'src/app/servicios/autores.service';
import { LibrosService } from 'src/app/servicios/libros.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {

  idactual: number = 0;
  codigo: number | null = null;
  titulo: string | null = null;
  idautor: number | null = null;
  paginas: number | null = null;

  codigoValido: boolean = true;
  tituloValido: boolean = true;
  autorValido: boolean = true;
  paginasValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  modo: 'Registrar' | 'Editar' = 'Registrar';

  listaAutores: Autor[] = [];

  @Output()
  recargarLibros: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicioLibros: LibrosService,
    private servicioAutores: AutoresService
  ) { }
 
  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(){
    this.servicioAutores.get().subscribe({
      next: (autores) => {
        this.listaAutores = autores;
      },
      error: (e) => {
        console.log('Error al cargar autores');
        console.log(e);
        this.mensajes = [{severity: 'error', summary: 'Error a cargar autores', detail: e.error}];
      }
    })
  }

  guardar(){
    this.validar();
    if(this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido){
      //Construimos el objeto libro para enviar al servidor
      const libro: Libro = {
        id: this.codigo,
        titulo: this.titulo,
        idautor: this.idautor,
        autor: null,
        paginas: this.paginas 
      }
      if(this.modo === 'Registrar'){
        this.registrar(libro);
      }else{
        this.editar(libro);
      }
    }
  } 

  private registrar(libro: Libro){
    //Enviamos el objeto al servidor mediante el método POST del servicio
    this.guardando = true;
    this.servicioLibros.post(libro).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes = [{severity: 'success', summary: 'Éxito.', detail: 'Se registró el libro.'}];
        this.recargarLibros.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        this.mensajes = [{severity: 'error', summary: 'Érror al registrar.', detail: e.error}];
      }
    });
  }

  private editar(libro: Libro){
    this.guardando = true;
    this.servicioLibros.put(libro, this.idactual).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajes = [{severity: 'success', summary: 'Éxito.', detail: 'Se editó el libro.'}]
        this.recargarLibros.emit(true);
      },
      error: (e) => {
        this.guardando = false;
        console.log(e);
        this.mensajes = [{severity: 'error', summary: 'Error al editar.', detail: e.error}];
      }
    })
  }

  validar(){

    this.codigoValido = this.codigo !== null;
    this.tituloValido = this.titulo !== null && this.titulo?.length > 0;
    this.autorValido = this.idautor !== null;
    this.paginasValido = this.paginas !== null;
    return this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido;

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
    this.idautor = null;
    this.paginas = null;

    this.codigoValido = true;
    this.tituloValido = true;
    this.autorValido = true;
    this.paginasValido = true;

    this.mensajes = []; 

  }

}
