import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__row');
    this.url='../lectures.json';

    //Þegar ítt er á takka þarf að sína rétta fyrilestra
    this.HTMLButton=document.getElementById('button__HTML');
    this.CSSButton=document.getElementById('button__CSS');
    this.JSButton=document.getElementById('button__JavaScript');
    this.HTMLButton.addEventListener('click', this.sortHTMLFunction);
    this.CSSButton.addEventListener('click', this.sortCSSFunction);
    this.JSButton.addEventListener('click', this.sortJSFunction);
  }
  
  /**
   * Hleður niðu gögnunum inn á síðuna
   */
  load() {
    this.loadLectures()
    .then(data => this.showList(data)) 
    
    .catch((error) => {
      console.error(error);
      this.setError(error.message);
    });  
  }
  
  /**
   * Fall sem skylar gögnunum
   */
  loadLectures() {
    return fetch(this.url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Villa við að sækja fyrirlestra');
      }
      return res.json();
    });
  }
  
  /**
   * Byrtir villuskilaboð
   * @param {String} errorMessage 
   */
  setError(errorMessage){
    displayError(errorMessage); 
  }
  
  /**
   * Fall sem byrtir þá fyrirlestra sem eru í flokki HTML
   * Og felur hina ef ekki er búið að byðja sérstaklega um að byrta þá
   * @param {click on button} e 
   */
  sortHTMLFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.CSSButton = document.getElementById('button__CSS');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');

    //Ef ekki er búið að ýta á hina takkana látum við allt nema HTML-ið hverfa
    if(e.target.id == 'button__HTML'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að íta á annan takka, látum við allt annað en HTML hverfa
        if((this.CSSButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'html'){
            console.log(this.containerRow.childNodes[i]);
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við HTML birtast
          if(this.containerRow.childNodes[i].id === 'html'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }
  /**
   * Fall sem byrtir þá fyrirlestra sem eru í flokki CSS
   * Og felur hina ef ekki er búið að byðja sérstaklega um að byrta þá
   * @param {click on button} e 
   */
  sortCSSFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.HTMLButton = document.getElementById('button__HTML');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');

    if(e.target.id == 'button__CSS'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að íta á annan takka, látum við allt annað en css hverfa
        if((this.HTMLButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'css'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við css birtast
          if(this.containerRow.childNodes[i].id === 'css'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }
  /**
   * Fall sem byrtir þá fyrirlestra sem eru í flokki JavaScript 
   * Og felur hina ef ekki er búið að byðja sérstaklega um að byrta þá
   * @param {click on button} e 
   */
  sortJSFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.HTMLButton = document.getElementById('button__HTML');
    this.CSSButton = document.getElementById('button__CSS');
    this.containerRow = document.querySelector('.list__row');

    if(e.target.id == 'button__JavaScript'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að íta á annan takka, látum við allt annað en JavaScript hverfa
        if((this.HTMLButton.classList.value === 'button') && (this.CSSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við JavaScript birtast
          if(this.containerRow.childNodes[i].id === 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }

  /**
   * Skilar þeim upplýsingum sem eru vistuð í Local Storage á þessari síðu
   */
  addSaved(data){
    const saved = loadSavedLectures(); // Hér eru allir visturð

    data.finished = saved.indexOf(data.slug) >= 0;

    return data;
  }

  /**
   * Býr til mynda hlut ef mynd er til staðar. Annar tóman hlut
   * Skilar svo hlutnum
   */
  imageElement(data){
    const image = el('div');
    image.classList.add('index__lectureImage');

    if(data.thumbnail){
      const img = el('img');
      img.setAttribute('src', data.thumbnail);
      img.classList.add('index__lectureImg');
      img.setAttribute('alt', data.title); 
      image.appendChild(img);
    } else {
      const img = el('div');
      img.classList.add('index__lectureImg');
      img.setAttribute('alt', data.title); 
      image.appendChild(img);
    }
    
    return image;
  }

  /**
   * Být til textaboxið sem heldur utan um fyrirsögn og flokk
   * hvers fyrilesturs. Skilar textaboxinu. 
   */
  textElement(data){
    const category = el('a' , data.category);  
    category.classList.add('index__lectureCategory');
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);  

    const heading = el('h2', data.title);  
    heading.classList.add('index__lectureTitle');

    const finished__image = el('div'); 
    const finished__img = el('p',  '✓');
    finished__img.classList.add('finished__img'); 
    finished__image.appendChild(finished__img);

    const index__lectureText= el('div', category, heading);
    index__lectureText.classList.add('index__lectureText');

    const textElement= el('div', index__lectureText, finished__image);
    textElement.classList.add('index__textElement');

    return textElement;
  }

  /**
   * Sýnir eða tekur af done merkið ✓ eftir því hvort hlutur sé vistaður í 
   * Local Storage eða ekki. 
   */
  showDone(textElement, data){
    const ls = localStorage.lectures.substring(1,(localStorage.lectures.length)-1)
    const lsList = ls.split(',');
    for(let i=0; i< lsList.length; i++){
      if(lsList[i] === '"' + data.slug + '"'){
        textElement.childNodes[1].classList.toggle('invisible');
      }
    }
    return '';
  }

  /**
   * Byrtir gögnin á síðunni
   */
  show(data){
    const image = this.imageElement(data);
    const textElement = this.textElement(data);

    const finalItem = el('a', image, textElement);
    finalItem.classList.add('lectureContainer');
    finalItem.setAttribute('id', data.category);
    finalItem.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);
    this.containerRow.appendChild(finalItem);

    textElement.childNodes[1].classList.toggle('invisible');

    this.showDone(textElement, data);

    return '';
  }

  /**
   * Rennur í genum lista af öllum gögnunum sem á að byrta, og lætur byrta hvert og eitt
   */
  showList(data){
    var i;
    for(i=0; i< data.lectures.length; i++){
      this.show(data.lectures[i]);
    }
    return '';
  }
}
