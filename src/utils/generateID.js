export const generateID = (day) => {
    const randomNum = Math.floor(Math.random() * 10000);
    let id = day + '-' + String(randomNum).padStart(4, '0');    
    return id;    
}