import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures,  } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.containerRow = document.querySelector('.list__roww');
    this.url='../lectures.json';
  }

  load() {
    this.loadLectures()
      //.then(data => this.addSaved(data.lectures[0]))
      //.then(data => this.showList(data)) //Þetta er bara fyrsta

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

  showList(data){

    //Rennur í gegnum allan listann
    //

    console.log(data); //data er fylki með öllu inni í lectures
    const image = el('div');
    const img = el('img');
    img.setAttribute('src', data.thumbnail); //Ekki allir eru með mynd, setja if setningu
    img.setAttribute('alt', '');
    image.appendChild(img);

    const category = el('a' , data.category);
    category.setAttribute('href', '/fyrirlestur.html?slug'+data.slug);  //Af hverju ekki rautt undir!??
    
    const heading = el('h2', data.heading);

    const finished = el('h1', data.finishd, data.toString()); //Bara með þetta til að penta einhvern streng
    const textElement= el('div', heading, category, finished);

    const finalItem = el('a', image, textElement);
    this.container.appendChild(finalItem)

    return '';

  }

  //Nota youtube: Notar iframe með sorce fameborder og allow fullsclrean true 



}
