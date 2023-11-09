import {GET_USER_BY_TOKEN} from './routes.js'


   const findToken = () => {
        const token = localStorage.getItem("jwt")
        if(token){
            return token;
        } else {
            return ""
        }
    }
    
    const token = findToken()




/*export const getUserbyToken = async (props) => {
    
    const findToken = () => {
        const token = localStorage.getItem("jwt")
        console.log(token)
        if(token){
            return token;
        } else {
            return ""
        }
    }
    
    const token = findToken()
    
    const user = await fetch(GET_USER_BY_TOKEN, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user)
        return user
    })
    
    return user
}*/

export async function get(url, data, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function post(url, data, ) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function put(url, data, config = {}) {

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data)
                        } else {
                            reject(data)
                        }
                    })
                    .catch((err) => reject(err))
            })
            .catch(error => reject(error))
    })
}

export async function del(url, data, config = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${findToken()}`
            }
        })
            
    })
}


export async function postImage(url, formData) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${findToken()}`
            }
        })
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (response.ok) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
                    .catch((err) => reject(err));
            })
            .catch((error) => reject(error));
    });
}


