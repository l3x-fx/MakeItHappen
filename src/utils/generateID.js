// export const generateID = (day) => {
//     const randomNum = Math.floor(Math.random() * 10000);
//     let id = day + '-' + String(randomNum).padStart(4, '0');    
//     return id;    
// }

export const generateID = (day, todos) => {
    const createId = () => {
        const randomNum = Math.floor(Math.random() * 10000);
        let id = day + '-' + String(randomNum).padStart(4, '0');    
        return id;
    }
    

    let newID = createId()

    if (todos !== undefined) {
        let idExists = todos.some(todo => todo.id === newID);
        while(idExists){
            newID = createId(day);
            idExists = todos.some(todo => todo.id === newID);
        }   
    } 
    return newID
}

