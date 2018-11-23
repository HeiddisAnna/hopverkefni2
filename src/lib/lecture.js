import { empty, el } from './helpers';
import { loadSavedLectures, savedLectures,  } from './storage';

export default class List {
    constructor() {
      this.container = document.querySelector('.lecture-page');
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
  
    load() {
      //empty(this.container);
      const qs = new URLSearchParams(window.location.search);
      console.log(qs);
      const slug = qs.get('slug');
      console.log(slug);

      //Villumeðhöndlun - ef síðan fannst ekki


      //Hér myndum við vilja sækja fyrirlsetra
      //Finna réttan fyrirlestur
      //Sækja alla, til að finna rétta.

      const finished = el('a', 'Finishd');
      finished.setAttribute('href', '/fyrirlestur.html?slug=' +slug); //þarf að laga þetta
      finished.addEventListener('click', this.finished); 
      this.container.appendChild(finished);


    }


}