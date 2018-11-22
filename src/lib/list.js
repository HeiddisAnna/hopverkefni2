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
      //.then(data => this.addSaved(data.lectures[0]))
      //.then(data => this.showList(data)) //Þetta er bara fyrsta

      //.then(data => this.show(data.lectures[0])) //Virkar til að sýna fyrsta
      //console.log('Fyrsta kall data.lectures[0]: ' + data.lectures[0]);

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
    console.log(data.thumbnail);
    if(data.thumbnail){
      img.setAttribute('src', data.thumbnail); //setjum myndina inn í img
    }
    img.setAttribute('alt', data.title); //Skýringartexti við myndina
    image.appendChild(img); //festum img á image

    const category = el('a' , data.category);
    category.classList.add('index__lectureCategory');
    category.setAttribute('href', '/fyrirlestur.html?slug'+data.slug);  //Af hverju ekki rautt undir!??
    
    const heading = el('h2', data.title);
    heading.classList.add('index__lectureTitle');

    const finished = el('h1', data.finishd, data.toString()); //Bara með þetta til að penta einhvern streng
    const textElement= el('div', heading, category, finished);

    const finalItem = el('a', image, textElement);
    this.containerRow.appendChild(finalItem)

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
