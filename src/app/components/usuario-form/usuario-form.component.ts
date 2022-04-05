import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Usuario} from '../../models/usuario';
import {Rol} from '../../models/rol';
import {UsuariosService} from '../../services/usuarios.service';
import {LoadingOverlayService} from '../../services/loading-overlay.service';
import {finalize} from 'rxjs/operators';
import {MensajeService} from '../../services/mensaje.service';
import {MensajeModalType} from '../mensaje-modal/mensaje-modal.component';

export enum UFProfile {
  USUARIO = 'USUARIO',
  CLIENTE = 'CLIENTE',
}

const repeatedPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repetirPassword = control.get('repetir_password');

  return password && repetirPassword && password.value !== repetirPassword.value ? { repeatedPassword: true } : null;
};

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  allRoles = [
    { value: Rol.ADMINISTRADOR, text: 'Administrador' },
    { value: Rol.ENCARGADO, text: 'Encargado' },
    { value: Rol.VENDEDOR, text: 'Vendedor' },
    { value: Rol.VIAJANTE, text: 'Viajante' },
    { value: Rol.COMPRADOR, text: 'Comprador' },
  ];

  private pUsuario: Usuario;
  @Input() set usuario(value: Usuario) { this.pUsuario = value; }
  get usuario(): Usuario { return this.pUsuario; }

  private pProfile = UFProfile.USUARIO;
  @Input() set profile(value: UFProfile) { this.pProfile = value; }
  get profile(): UFProfile { return this.pProfile; }

  @Output() userSaved = new EventEmitter<Usuario>();

  @Input() saving: boolean = false;
  @Output() savingChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private loadingOverlayService: LoadingOverlayService,
              private mensajeService: MensajeService) { }

  ngOnInit() {
    this.createForm();
  }

  setSaving(state: boolean) {
    this.saving = state;
    this.savingChange.emit(this.saving);
  }

  createForm() {
    this.form = this.fb.group({
      habilitado: true,
      username: ['', Validators.required],
      password: '',
      repetir_password: '',
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: [[], Validators.required],
    }, { validators: repeatedPasswordValidator });

    this.applyDataAndProflie();
  }

  applyDataAndProflie() {
    if (this.pUsuario) {
      this.form.patchValue(this.pUsuario);
    }

    if (!this.pUsuario || !this.pUsuario.idUsuario) {
      this.form.get('password').setValidators(Validators.required);
    }

    if (this.pProfile === UFProfile.CLIENTE) {
      this.form.get('habilitado').disable();
      this.form.get('roles').disable();
    }
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const formValues = this.form.value;

      const usuario: Usuario = {
        idUsuario: this.pUsuario ? this.pUsuario.idUsuario : null,
        habilitado: formValues.habilitado ? formValues.habilitado : this.pUsuario.habilitado,
        username: formValues.username,
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        password: formValues.password,
        email: formValues.email,
        roles: formValues.roles ? formValues.roles : this.pUsuario.roles,
      };

      const obvs = this.usuario && this.usuario.idUsuario
        ? this.usuariosService.updateUsuario(usuario)
        : this.usuariosService.createUsuario(usuario)
      ;

      this.setSaving(true);
      this.loadingOverlayService.activate();
      obvs
        .pipe(finalize(() => {
          this.setSaving(false);
          this.loadingOverlayService.deactivate();
        }))
        .subscribe({
          next: u => this.userSaved.emit(u),
          error: err => this.mensajeService.msg(err.error, MensajeModalType.ERROR)
        })
      ;
    }
  }
}
