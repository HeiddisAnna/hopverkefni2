import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    console.log('er í lecture page');
   const lecture = new Lecture();
   lecture.load();
   
  } else {
    console.log(isLecturePage);
    console.log('er á hinni síðunni');
    const list = new List();
    list.load();
  } 
});


