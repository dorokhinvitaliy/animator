export function slideId(id: Number){
    return "slider_slide_id__"+id
}

export function getSlide(id: Number){
    return document.getElementById(slideId(id))
}