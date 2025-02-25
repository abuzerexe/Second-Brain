export default function hashify(len : number){
    const str = "kzdncioru109yt08hsbv427oqweh0124848912u";
    const strlen = str.length;
    let ans ="";

    for(let i = 0; i < len; i++){
        ans += str[(Math.floor(Math.random()*strlen))]
    }

    return ans;
}