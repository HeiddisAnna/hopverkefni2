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

      const finished__contaner = el('div');
      finished__contaner.classList.add('finished__contaner');
      const finished = el('a', 'Klára fyrirlestur');
      finished.setAttribute('href', '/fyrirlestur.html?slug=' +slug); 
      finished.addEventListener('click', this.finished); 
      finished.classList.add('finished');
      finished__contaner.appendChild(finished);
      this.container.appendChild(finished__contaner);

      const back__container = el('div');
      back__container.classList.add('back__container');
      const back = el('a', 'Til baka');
      back.setAttribute('href', '../' );
      back.classList.add('back__link');
      back__container.appendChild(back);
      this.container.appendChild(back__container);
    }

    show(data){
      
      if(data.type === 'text' || data.type === 'code'){
        const newElement = el('p', data.data);
        newElement.classList.add(data.type);
        this.containerList.appendChild(newElement);
      }

      if(data.type === 'list'){
        const newElement = el('ul');
        newElement.classList.add(data.type);
        for(let i = 0; i<data.data.length; i++){
          const underElement = el('li', data.data[i]);
          underElement.classList.add('list__item');
          newElement.appendChild(underElement);
        }
        this.containerList.appendChild(newElement);
      }

      
      if(data.type === 'quote'){
        const newElement = el('div');
        newElement.classList.add('quote__container');

        const quote = el('p', data.data);
        quote.classList.add('quote');

        const quoteAuthor = el('p', data.attribute);
        quoteAuthor.classList.add('quoteAuthor');

        newElement.appendChild(quote);
        newElement.appendChild(quoteAuthor);
        this.containerList.appendChild(newElement);
      }
      


      if(data.type === 'image'){
        const newElement = el('div');
        newElement.classList.add('image__container');

        const img = el('img');
        img.classList.add('lecture__img');
        img.setAttribute('src', data.data);

        console.log(img);

        const imgText = el('p', data.caption);
        imgText.classList.add('img__text');

        newElement.appendChild(img);
        newElement.appendChild(imgText);
        this.containerList.appendChild(newElement);
      }

      if(data.type === 'heading'){
        const newElement = el('h2', data.data);
        newElement.classList.add('category__heading');
        this.containerList.appendChild(newElement);
      }

      if(data.type === 'youtube'){
        const newElement = el('iframe');
        newElement.classList.add(data.type);
        newElement.setAttribute('src', data.data);
        this.containerList.appendChild(newElement);
      }
    }

    showHeader(data){
      this.containerHeader = document.querySelector('.header__container');
      const underheader = el('h2', data.category);
      underheader.classList.add('underHeader__text');
      this.containerHeader.appendChild(underheader);
      const headerTitle = el('h1', data.title);
      headerTitle.classList.add('header__text');
      this.containerHeader.appendChild(headerTitle);
    }

    showList(data){
      this.showHeader(data);

      for(let i=0; i< data.content.length; i++){
        this.show(data.content[i]);
      }
    
    }
}