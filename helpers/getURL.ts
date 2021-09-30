

function buildURL(query: any, page?: number) : string {
    let url : string = `?page=${!page ? (query.page || 1) : page}`
    
    for(let prop in query){
        if(prop !== 'page'){
          url += `&${prop}=${query[prop]}`
        }  
    }
 
    return url;
}

export default buildURL