import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures,  } from './storage';

export default class List {
    constructor() {
      this.container = document.querySelector('.lecture-page');
      this.containerList = document.querySelector('.lecture__list');
      this.url='../lectures.json';
    }

    //Er ekki að virka!
    //Hoppa á milli vistaðs og ekki vistaðs
    finished(e){
        const qs = new URLSearchParams(window.location.search);
        console.log(qs);
        const slug = ps.get('slug');

        savedLectures(slug)
        const saved = loadSavedLectures();

        return saved;
    }
    
    loadLectures(slug) {
      return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Villa við að sækja fyrirlestra');
        }
        return res.json();
      })
      .then((data) => {
        const found = data.lectures.find(i => i.slug === slug);
        if(!found){
          throw new Error('Fyrirlestur fannst ekki');
        }
        return found;
      });
    }
  
    load() {
      const qs = new URLSearchParams(window.location.search);
      const slug = qs.get('slug');

      this.loadLectures(slug)
      .then(data => this.showList(data)) //Sendum lista af öllum gögnunum inn í fallið
      
      .catch((error) => {
        console.error(error);
        this.setError(error.message);
      }); 

      //Villumeðhöndlun - ef síðan fannst ekki


      //Hér myndum við vilja sækja fyrirlsetra
      //Finna réttan fyrirlestur
      //Sækja alla, til að finna rétta.

      const finished = el('a', 'Finishd');
      finished.setAttribute('href', '/fyrirlestur.html?slug=' +slug); //þarf að laga þetta
      finished.addEventListener('click', this.finished); 
      this.container.appendChild(finished);
    }

    show(data){
      console.log(data.data);
      console.log(data.type == 'text');
      
      if(data.type == 'text'){
        const newElement = el('p', data.data);
        newElement.classList.add(data.type);
        this.containerList.appendChild(newElement);
      }

    }

    showList(data){
      //console.log(data.content);
      //console.log(data.content.length);

      for(let i=0; i< data.content.length; i++){
        this.show(data.content[i]);
      }
    
    }
}