export function cls(obj:any){
    var arr = [];
    for(var key in obj){
        if (obj[key]==true) {arr.push(key)}
    }
    return arr.join(" ");
}