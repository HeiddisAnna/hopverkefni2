import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
   const lecture = new Lecture();
   lecture.load();
   console.log('Er á lecture síðu');
   
  } else {
    const list = new List();
    list.load();
    console.log('Er á fyrirlestra síðu');
  } 
});


