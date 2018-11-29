const LOCALSTORAGE_KEY = 'lectures';

/**
 * Skilar þeim hlutum sem eru vistaðir í Local Storage
 */
export function loadSavedLectures() {
    const savedJsonLectures = localStorage.getItem(LOCALSTORAGE_KEY);
    const savedLectures = JSON.parse(savedJsonLectures) || [];

    return savedLectures;
}

/**
 * Vistar eða hættir að vista hluti í Locale Storage
 */
export function savedLectures(slug) { 
    const saved = loadSavedLectures(); 
    
    //Ef hlutur er nú þegar vistaður hefur index gildið -1
    const index = saved.indexOf(slug); 

    if(index >= 0){ 
        saved.splice(index, 1); 
    } else {
        saved.push(slug);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}


