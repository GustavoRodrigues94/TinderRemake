import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { IPessoa } from '../compartilhado/interfaces/Ipesssoa';

@Component({
  selector: 'app-cards-pessoas',
  templateUrl: './cards-pessoas.component.html',
  styleUrls: ['./cards-pessoas.component.scss'],
})
export class CardsPessoasComponent implements OnInit {
  @ViewChild('cardsPessoas')  cardsPessoas: IonSlides;
  pessoas:IPessoa[] = [];
  indexFoto: number = 0;
  indexPessoa: number = 0;
  movimentoUsuarioAnterior: number = 0;
  iniciouGostei: boolean = false;
  iniciouNaoGostei: boolean = false;
  primeiraVez: boolean = false;
  deuGostei: boolean = null;

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 10,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };


  constructor(public platform: Platform) { }

  ngOnInit() {
    var pessoa1 : IPessoa = {
      nome: "Angelina Jolie",
      fotos: [
        "../../assets/imagens/Angelina Jolie/1.jpg",
        "../../assets/imagens/Angelina Jolie/2.jpg",
        "../../assets/imagens/Angelina Jolie/3.jpg"
      ],
      idade: 45,
    };

    var pessoa2: IPessoa = {
      nome: "Bruna Marquezine",
      fotos: [
        "../../assets/imagens/Bruna Marquezine/1.jpg",
        "../../assets/imagens/Bruna Marquezine/2.jpg",
        "../../assets/imagens/Bruna Marquezine/3.jpg",
        "../../assets/imagens/Bruna Marquezine/4.jpg",
        "../../assets/imagens/Bruna Marquezine/5.jpeg",
      ],
      idade: 25,
    };

    var pessoa3: IPessoa = {
      nome: "Jennifer Lawrence",
      fotos: [
        "../../assets/imagens/Jennifer Lawrence/1.png",
        "../../assets/imagens/Jennifer Lawrence/2.jpg",
        "../../assets/imagens/Jennifer Lawrence/3.jpg",
        "../../assets/imagens/Jennifer Lawrence/4.webp",
        "../../assets/imagens/Jennifer Lawrence/5.jpg",
        "../../assets/imagens/Jennifer Lawrence/6.jpg"
      ],
      idade: 30,
    };

    var pessoa4: IPessoa = {
      nome: "Juliana Paes",
      fotos: [
        "../../assets/imagens/Juliana Paes/1.jpg",
        "../../assets/imagens/Juliana Paes/2.jpg",
      ],
      idade: 42,
    };

    this.pessoas.push(pessoa1);
    this.pessoas.push(pessoa2);
    this.pessoas.push(pessoa3);
    this.pessoas.push(pessoa4);
  }

  clicouNaFoto(event : any){
    var quantidadeFotosPessoa = this.pessoas[this.indexPessoa].fotos.length -1;

    var divisaoTela = this.platform.width() / 2;
    if(event.detail.x > divisaoTela)
    {
      if(quantidadeFotosPessoa === this.indexFoto) return;

      this.indexFoto++;
    }
    else if(this.indexFoto === 0){
      return;
    }
    else{
      this.indexFoto--;
    }
  }

  alterouSlide(event: any){
    this.iniciouGostei = false;
    this.iniciouNaoGostei = false;
    this.primeiraVez = false;
    this.indexFoto = 0;
  }

  iniciouArrastar(event){
    var movimentoUsuarioAtual =  event.detail.touches[0].screenX;

    if(this.primeiraVez === false ){
      this.movimentoUsuarioAnterior = movimentoUsuarioAtual;
      this.primeiraVez = true;
    }

    if(movimentoUsuarioAtual < this.movimentoUsuarioAnterior)
    {
      this.iniciouGostei = true;
      this.iniciouNaoGostei = false;
    }

    if(movimentoUsuarioAtual > this.movimentoUsuarioAnterior)
    {
      this.iniciouGostei = false;
      this.iniciouNaoGostei = true;
    }

    if(this.iniciouGostei && (this.movimentoUsuarioAnterior - movimentoUsuarioAtual) > 80)
      this.deuGostei = true;
    else if(this.iniciouNaoGostei && (movimentoUsuarioAtual - this.movimentoUsuarioAnterior) > 80)
      this.deuGostei = false;
  }

  soltouTouch(){
    this.iniciouGostei = false;
    this.iniciouNaoGostei = false;
    this.primeiraVez = false;

    if(this.deuGostei === null || this.deuGostei === undefined) return;

    console.log(this.deuGostei ? "Gostou" : "Não gostou");

    const index = this.pessoas.indexOf(this.pessoas[this.indexPessoa], 0);
    if (index > -1) {
      this.pessoas.splice(index, 1);
      this.indexFoto = 0;
      this.deuGostei = null;
    }
  }

  exitemPessoasParaVotar() : boolean {
    return this.pessoas?.length > 0
  }

  async darGostei(){
    this.deuGostei = true;
    this.iniciouGostei = true;

    this.cardsPessoas.slideNext(1000).then(async () => {
      this.iniciouGostei = true;
      await new Promise(resolve => setTimeout(resolve, 400));
      this.soltouTouch();
    });
  }

  darNaoGostei(){
    this.deuGostei = false;
    this.iniciouNaoGostei = true;

    this.cardsPessoas.slidePrev(1000).then(async () => {
      this.iniciouNaoGostei = true;
      await new Promise(resolve => setTimeout(resolve, 400));
      this.soltouTouch();
    });
  }

}
