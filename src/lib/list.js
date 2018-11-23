import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures,  } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__row');
    this.url='../lectures.json';
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

  addSaved(data){
    //Nota lúbbu hér
    const saved = loadSavedLectures(); // Hér eru allir visturð

    data.finished = saved.indexOf(data.slug) >= 0;

    return data;
  }

  show(data){
    
    const image = el('div'); //Búum til klasa fyrir mydina
    image.classList.add('index__lectureImage'); //Skýrum klasann
    const img = el('img'); //Búum til element fyrir myndina
    img.classList.add('index__lectureImg'); //Skýrum klasann
    //Sækjum myndina af hún er til staðar
    if(data.thumbnail){
      img.setAttribute('src', data.thumbnail); //setjum myndina inn í img
    }
    img.setAttribute('alt', data.title); //Skýringartexti við myndina
    image.appendChild(img); //festum img á image

    const category = el('a' , data.category);  //Af hvaða tegund er verkefnið
    category.classList.add('index__lectureCategory');
    category.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);  //Af hverju ekki rautt undir!??
    
    const heading = el('h2', data.title);  //Ná í heitið á verkefninu
    heading.classList.add('index__lectureTitle');

    console.log('data.finished: ' + data.finished); //Virkar ekki!

    //const finished = el('h1', data.finished, data.toString()); //Bara með þetta til að penta einhvern streng
    const finished__image = el('div'); //Búum til klasa fyrir mydina
    finished__image.classList.add('finished__image'); //Skýrum klasann
    //const finished__img = el('img'); //Búum til element fyrir myndina
    const finished__img = el('img'); 
    img.classList.add('finished__img'); //Skýrum klasann
    finished__image.appendChild(finished__img);

    const index__lectureText= el('div', category, heading);
    index__lectureText.classList.add('index__lectureText');

    const textElement= el('div', index__lectureText, finished__image);
    textElement.classList.add('index__textElement');

    if(data.thumbnail){
      const finalItem = el('a', image, textElement);
      finalItem.classList.add('lectureContainer');
      finalItem.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);
      this.containerRow.appendChild(finalItem);
    } else {
      const finalItem = el('a', textElement);
      finalItem.classList.add('lectureContainer');
      finalItem.setAttribute('href', '/fyrirlestur.html?slug='+data.slug);
      this.containerRow.appendChild(finalItem);
    }
  
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
