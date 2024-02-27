export default class AnimaNumeros {
  constructor(numeros, observeTarget, observerClass) {
    this.numeros = document.querySelector(numeros);
    this.observeTarget = document.querySelector(observeTarget);
    this.observerClass = observerClass;
    this.handleMutation = this.handleMutation.bind(this);
  }

  // recebe um elemento do dom, com número em seu texto
  // incrementa a partir de 0 até o número final
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa incrementar número para cada
  // número selecionado do dom
  numerosAnima() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero)
    );
  }

  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.numerosAnima();
    }
  }

  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observeTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observeTarget) {
      this.addMutationObserver();
    }
    this.addMutationObserver();
    return this;
  }
}
