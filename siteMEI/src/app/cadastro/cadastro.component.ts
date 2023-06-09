import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import cnaeImport from '../atividadesMEI.json';
import { Cnae } from '../cnae';
import { DataService } from '../data.service';
import { HttpCpfService } from '../httpcpf.service';
import { HttpIptuService } from '../httpiptu.service';
import { HttpMeiService } from '../httpmei.service';
import { CpfModel } from './cpfmodel';
import { FormModel } from './formmodel';
import { IptuResponseModel } from './ipturesponse';
import { IptuViabilidadeModel } from './iptuviabilidade';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public cnaeList: Cnae[] = cnaeImport;
  public cnaeResultadoBusca: Cnae[] = this.cnaeList;
  public iptuResponse: IptuResponseModel;

  public cpfAtual: CpfModel = {
    ni: "",
    nome: "",
    situacao: { codigo: "", descricao: "" },
    nascimento: "",
    naturezaOcupacao: ""
  }

  public estabelecerModel: IptuViabilidadeModel = {
    grupoNaturezaJur: '',
    naturezaJur: '',
    objConsulta: '',
    tipoEstabelecimento: '',
    cnaePrincipal: '',
    cpf: '',
    inscrCadIPTU: '',
    areaEmpreend: 0
  }

  public formModel: FormModel = {
    id: '',
    nome: '',
    cpf: '',
    statusCpf: '',
    dataNascimento: '',
    email: '',
    telefone1: '',
    telefone2: '',
    cnaePrimario: '',
    cnaePrimarioOcupacao: '',

    eFuncPublico: false,
    eSocio: false,
    eMeiAtivo: false,

    temAposentadoriaInvalidez: false,
    temAuxilioDoenca: false,
    temSalarioMaternidade: false,
    temSegDesemprego: false,
    temBpcLoas: false,
    temProuni: false,
    temFies: false,
    temBolsaFamilia: false,
    temFiliais: false,

    previsaoFaturamento: 0,
    previsaoCustos: 0,
    nrFuncionarios: 0,

    nrCadastroIPTU: '',
    enderecoIPTU: '',
    areaEmpreend: 0,

    statusConsultaMEI: false,
    statusConsultaIPTU: false,
    codStatusConsultaIPTU: 9,
    dataConsulta: ''
  }

  constructor(
    private httpCpfService: HttpCpfService,
    private httpIptuService: HttpIptuService,
    private httpMeiService: HttpMeiService,
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.data.requisicaoAtual.subscribe(requisicao => this.formModel = requisicao);    
    document.getElementById(`spinnerCad`)?.classList.add('slide-hidden'); 
    // Carregamento inicial do objeto contendo dados do cpf obtidos na tela recaptcha
    // Estes dados serão carregados automaticamente na primeira etapa do form
    this.cpfAtual = this.data.getcpfExport();
    this.formModel.nome = this.cpfAtual.nome;
    this.formModel.dataNascimento = this.cpfAtual.nascimento;
    this.formModel.statusCpf = this.cpfAtual.situacao.descricao;
    this.formModel.cpf = this.cpfAtual.ni;

    switch (this.cpfAtual.naturezaOcupacao){
      case '22': this.formModel.eFuncPublico = true; break;
      case '12': this.formModel.eSocio = true; break;
      case '11': this.formModel.eMeiAtivo  = true; break;
    }     
  }

  buscaCNAE(key: string) {
    const results: Cnae[] = [];
    for (const cnae of this.cnaeList) {
      if (cnae.ocupacao.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1
        || cnae.cnae.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1) {
        results.push(cnae);
      }
    }
    this.cnaeResultadoBusca = results
  }

  getCPF(cpf: string) {
    cpf = cpf.replace(/[^0-9]/g, '')
    if (cpf) {
      this.httpCpfService.getRequest(cpf).subscribe((response) => {
        this.cpfAtual = response;
        this.formModel.nome = this.cpfAtual.nome;
        this.formModel.dataNascimento = this.cpfAtual.nascimento;
        this.formModel.statusCpf = this.cpfAtual.situacao.descricao;
        this.formModel.cpf = cpf;
      })
    }
}

  getIPTU(nrCadastroIPTU: string) {
    nrCadastroIPTU = nrCadastroIPTU.replace(/[^0-9]/g, '');
    if (nrCadastroIPTU) {
      this.httpIptuService.getRequest(nrCadastroIPTU).subscribe((response) => {
        this.iptuResponse = response;
        this.formModel.enderecoIPTU = this.iptuResponse.endereco;
      })
    }
  }

  public resultadoEstabelecer: string;  

  consultaEstabelecer(nrCadastroIPTU: string, cnaePrincipal: string){
    this.estabelecerModel.inscrCadIPTU = nrCadastroIPTU;
    this.estabelecerModel.cnaePrincipal = cnaePrincipal.replaceAll("-","");
    this.estabelecerModel.cnaePrincipal = cnaePrincipal.replaceAll("/","");
    this.httpIptuService.postRequest(this.estabelecerModel).subscribe((response) => {
      this.resultadoEstabelecer = response;
      if (this.resultadoEstabelecer == '0'){this.formModel.statusConsultaIPTU = true}
      this.formModel.codStatusConsultaIPTU = parseInt(this.resultadoEstabelecer)      
    })
  }

  postMEI() {    
      this.httpMeiService.postRequest(this.formModel).subscribe((response) => {
      console.log('resposta do post');
      console.log(response);

      this.formModel.id = response.id
      this.formModel.dataConsulta = response.dataConsulta
      this.router.navigate(['/validacaocad'])

      if (response.id) {
        alert('Cadastro enviado com sucesso!')
      }  
    })
  }

  atribuiCnae(elem: any) {
    this.formModel.cnaePrimario = elem.value
    this.formModel.cnaePrimarioOcupacao = elem.dataset.ocup
  }

  onSubmit() {
    this.consultaEstabelecer(this.formModel.nrCadastroIPTU, this.formModel.cnaePrimario);
    this.postMEI()
  }

  // funcionalidade de carousel
  public slideAtivo: number = 1;

  nextButtonClick() {
    if (this.slideAtivo < 1 || this.slideAtivo > 6) { return }   
    if (this.slideAtivo != 6) { this.slideAtivo++; }
    if (this.slideAtivo == 6) {
      this.bloqueioSlide();     
      this.onSubmit(); 
      return;
    }
    var allSlides = document.querySelectorAll('.slide')

    var slideAtivar = document.getElementById(`slide-${this.slideAtivo}`)
    allSlides.forEach(element => {
      element.classList.add('slide-hidden')
    });
    slideAtivar?.classList.remove('slide-hidden')
  }

  prevButtonClick() {
    if (this.slideAtivo < 1 || this.slideAtivo > 6) { return }
    if (this.slideAtivo != 1) { this.slideAtivo--; }

    var allSlides = document.querySelectorAll('.slide')

    var slideAtivar = document.getElementById(`slide-${this.slideAtivo}`)
    allSlides.forEach(element => {
      element.classList.add('slide-hidden')
    });
    slideAtivar?.classList.remove('slide-hidden')
  }

  // Bloqueio da navegação durante o processamento do formulário de cadastro
  bloqueioSlide() {
    document.getElementById(`slide-arrow-next`)?.classList.add('slide-hidden');
    document.getElementById(`slide-arrow-prev`)?.classList.add('slide-hidden');
    document.getElementById(`spinnerCad`)?.classList.remove('slide-hidden');
  }
   
}