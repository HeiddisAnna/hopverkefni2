const LOCALSTORAGE_KEY = 'lectures';

export function loadSavedLectures() {
    const savedJsonLectures = localStorage.getItem(LOCALSTORAGE_KEY);
    const savedLectures = JSON.parse(savedJsonLectures) || [];

    return savedLectures;
}

export function savedLectures(slug) { //af hverju kemur ekki rautt undir!!?
    const saved = loadSavedLectures();

    const index = saved.indexOf(slug); //Ef þetta er ekki saved þá er þetta -1

    if(index >= 0){ //Þetta er til
        saved.splice(index, 1); //byrja frá þeim index þar sem index er, og tökum 1 lengar. Af því ég skrifaði 1
    } else {
        saved.push(slug);
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}


