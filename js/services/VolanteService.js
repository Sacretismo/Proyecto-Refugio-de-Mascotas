
const GetAlquileres = (idCliente) => {
    let url = "http://localhost:8080/api/volantes";
    return fetch(url, {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',

        },

    })
            .then(response => { 
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch(err => console.log('ERROR: ' + err))
}

export default GetAlquileres;

