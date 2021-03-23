;export function attach(id, options) {
    let instance = bulmaCarousel.attach("#"+id, options)[0];

    return instance;

}