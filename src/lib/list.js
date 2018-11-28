import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__row');
    this.url='../lectures.json';
    //this.buttons = document.querySelector('.button');

    //Þegar ítt er á takka þarf að sína rétta fyrilestra
    this.HTMLButton=document.getElementById('button__HTML');
    this.CSSButton=document.getElementById('button__CSS');
    this.JSButton=document.getElementById('button__JavaScript');
    this.HTMLButton.addEventListener('click', this.sortHTMLFunction);
    this.CSSButton.addEventListener('click', this.sortCSSFunction);
    this.JSButton.addEventListener('click', this.sortJSFunction);
  }
  
  
  showHTMLData(){
    
    return '';
  }
  
  load() {
    this.loadLectures()
    .then(data => this.showList(data)) //Sendum lista af öllum gögnunum inn í fallið
    
    .catch((error) => {
      console.error(error);
      this.setError(error.message);
    });  
  }
  
  loadLectures() {
    return fetch(this.url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Villa við að sækja fyrirlestra');
      }
      return res.json();
    });
  }
  
  setError(errorMessage){
    displayError(errorMessage); 
  }
  
  sortHTMLFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.CSSButton = document.getElementById('button__CSS');
    this.JSButton = document.getElementById('button__JavaScript');
    this.containerRow = document.querySelector('.list__row');

    //Ef ekki er búið að ýta á hina takkana látum við allt nema HTML-ið hverfa
    if(e.target.id == 'button__HTML'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að íta á annan takka, látum við allt annað en css hverfa
        if((this.CSSButton.classList.value === 'button') && (this.JSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'html'){
            console.log(this.containerRow.childNodes[i]);
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við css birtast
          if(this.containerRow.childNodes[i].id === 'html'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }
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
  sortJSFunction(e) {
    e.target.classList.toggle('sort__button'); //Skiptum um klasanafn þegar takki er valinn
    this.HTMLButton = document.getElementById('button__HTML');
    this.CSSButton = document.getElementById('button__CSS');
    this.containerRow = document.querySelector('.list__row');

    if(e.target.id == 'button__JavaScript'){
      for(let i= 1; i<=this.containerRow.children.length; i++){
        //Ef ekki er búið að íta á annan takka, látum við allt annað en css hverfa
        if((this.HTMLButton.classList.value === 'button') && (this.CSSButton.classList.value === 'button')){
          if(this.containerRow.childNodes[i].id !== 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        } else { //Annars látum við css birtast
          if(this.containerRow.childNodes[i].id === 'javascript'){
            this.containerRow.childNodes[i].classList.toggle('invisible');
          } 
        }
      }
    }
  }

  addSaved(data){
    //Nota lúbbu hér
    const saved = loadSavedLectures(); // Hér eru allir visturð

    data.finished = saved.indexOf(data.slug) >= 0;

    return data;
  }

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

  textElement(data){
    const category = el('a' , data.category);  
    category.classList.add('index__lectureCategory');
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);  

    const heading = el('h2', data.title);  
    heading.classList.add('index__lectureTitle');

    //const finished = el('h1', data.finished, data.toString()); //Bara með þetta til að penta einhvern streng
    const finished__image = el('div'); 
    //finished__image.classList.add('finished__image'); 
    //const finished__img = el('img'); 
    //finished__img.classList.add('finished__img'); 
    //finished__img.setAttribute('src', './img/check.jpg');
    

    const finished__img = el('p',  '✓');
    finished__img.classList.add('finished__img'); 
    finished__image.appendChild(finished__img);

    const index__lectureText= el('div', category, heading);
    index__lectureText.classList.add('index__lectureText');

    const textElement= el('div', index__lectureText, finished__image);
    textElement.classList.add('index__textElement');

    return textElement;
  }

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

  showList(data){
    //Rennur í gegnum allan listann og birtum hann
    var i;
    for(i=0; i< data.lectures.length; i++){
      this.show(data.lectures[i]);
    }
    return '';
  }

  //Nota youtube: Notar iframe með sorce fameborder og allow fullsclrean true 



}
