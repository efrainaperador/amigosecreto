import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  friend: String = '';
  usuarios: any[] = new Array();
  usuarioSeleccionado: any;
  password: string = "";
  regalo: string;

  constructor(private http: Http) { }

  ngOnInit() {
    this.obtainUsers();
  }

  obtainUsers() {
    this.callObtainUsers().subscribe(response => {
      this.usuarios = response;
    }, error => {
      alert("Ocurrio un error vuelva a intentarlo")
    });
  }

  validatePassword() {
    if(this.usuarioSeleccionado) {
      let user = this.usuarios.filter((a) => {
        return a._id === this.usuarioSeleccionado;
      })[0];

      if(user.password && user.password !== "") {
        return user.password !== this.password;
      } else {
        return this.password.length < 4;
      }
    }
    return true;
  }

  validateRegalo() {
    if(!this.regalo || this.regalo === "") {
      return true;
    }

    return false;
  }

  generarAmigo() {
    console.log("-------------------------- GENERAR AMIGO --------------------------")
    if(this.validatePassword()) {
      alert("Contraseña equivocada");
      return;
    }
    if(this.validateRegalo()) {
      alert("Debe ingresar el regalo que quiere");
      return;
    }
    if(this.usuarioSeleccionado) {
      let user = this.usuarios.filter((a) => {
        return a._id === this.usuarioSeleccionado;
      })[0];
      console.log(user);
      if(user) {
        let amigoGenerado:any = this.usuarios.filter((a)=> {
          return a.ocupado === false && 
            a._id !== this.usuarioSeleccionado && 
            a.familia !== user.familia;
        });
        console.log(amigoGenerado);
        let aleatorio = Math.floor(Math.random()*amigoGenerado.length);
        amigoGenerado = amigoGenerado[aleatorio];
        console.log(amigoGenerado)
        console.log(user.amigo)
        this.friend = user.amigo && user.amigo !== "" ? user.amigo : amigoGenerado.nombre;
        console.log(this.friend);
        this.UpdateUser();
      }
    }
  }

  callObtainUsers() {
    return this.http.get('api/users').map(response => <String[]>response.json());
  }

  callUpdateUser() {
    let body = {
      user: this.usuarioSeleccionado,
      friend: this.friend,
      password: this.password,
      regalo: this.regalo
    }
    console.log(body)
    return this.http.post('api/users', body).map(response => <String[]>response.json());
  }

  UpdateUser() {
    this.callUpdateUser().subscribe(response => {
      console.log("response:", response);
      this.obtainUsers();
      return response;
    }, error => {
      if (error.status === 401)
        alert("El usuario no esta autorizado");
      else
        alert(error);
    });
  }

}