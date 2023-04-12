import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TelarecaptchaService } from '../telarecaptcha.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CpfModel } from '../cadastro/cpfmodel';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-telarecaptcha',
  templateUrl: './telarecaptcha.component.html',
  styleUrls: ['./telarecaptcha.component.css']
})
export class TelarecaptchaComponent {
  
  // O "CPF" e a "data de nascimento" serão preenchidos pelo usuário.
  // O "recaptcha" será retornado pelo Google assim que o usuário resolver o CAPTCHA  
  form: FormGroup = new FormGroup({
    cpfConsultaMEI: new FormControl(null, [Validators.required]),
    dtNascConsultaMEI: new FormControl(null, [Validators.required]),
    recaptcha: new FormControl(null, [Validators.required]),
  });
  
  public cpfValidacao: CpfModel = {
    ni: "",
    nome: "",
    situacao: { codigo: "", descricao: "" },
    nascimento: "",
    naturezaOcupacao: ""
  }

  @ViewChild('divRecaptcha')
  divRecaptcha!: ElementRef<HTMLDivElement>;

  // Variável de escopo global chamada "grecaptcha" referenciada através do "window"
  get grecaptcha(): any {
    const w = window as any;
    return w['grecaptcha'];
  }

  constructor(private router: Router, private ngZone: NgZone, private telarecaptchaService: TelarecaptchaService, private dataService: DataService) {
    this.renderizarReCaptcha();    
  }

  ngOnInit() {
    //const par = this.activatedRoute.snapshot.paramMap.get('parametro');
    //console.log(par);
  }

  renderizarReCaptcha() {
    // Evita que change detection seja disparado cada vez que o setTimeout for executado
    this.ngZone.runOutsideAngular(() => {
      // Delay caso o "grecaptcha" ainda não tenha sido carregado ou seu elemento <div> não tenha sido construído      
      if (!this.grecaptcha || !this.divRecaptcha) {
        setTimeout(() => {
          this.renderizarReCaptcha();
        }, 500);
        return;
      }

      // Recaptcha já está carregado. Renderização na tela.
      const idElemento =
        this.divRecaptcha.nativeElement.getAttribute('id');

      this.grecaptcha.render(idElemento, {
        sitekey: '6LdHVGQlAAAAAEEKwBw3gD2nNr7A2nf_EDrTsVvr',
        callback: (response: string) => {
          // Chamado quando o usuário resolver o desafio do CAPTCHA
          this.ngZone.run(() => {
            this.form.get('recaptcha')?.setValue(response);
          });
        },
      });
    });
  }

  public validaForm(form: NgForm) :void{    
    this.telarecaptchaService.retornaDadosCPF(form.value.cpfConsultaMEI).subscribe(
      (response: CpfModel) =>{
        if (response == null) alert("CPF INVÁLIDO");
        else{          
          if  (response.nascimento != form.value.dtNascConsultaMEI) alert("DATA DE NASCIMENTO INCORRETA");
          else{ 
            this.cpfValidacao = response;                       
            //this.router.navigateByUrl('/cadastro', {state: this.cpfValidacao});
            this.dataService.setcpfExport(this.cpfValidacao);
            this.router.navigateByUrl('/cadastro');
          }                 
        }
        form.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message); form.reset();})   
  }  
}