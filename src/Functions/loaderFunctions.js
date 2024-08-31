// Base URL for endpoints
export const BASE_URL = "http://4.237.58.241:3000";

// Loader function to load countries
/*export async function countriesLoader() {
    return fetch(BASE_URL + '/countries')
        .then(res => {
            if (!res.ok) {
                throw new Error("Something went wrong.")
            } else {
                return res.json()
            }
        })
        .then(res => {
            return res;
        }).catch(error => {
            console.log(error)
            return error;
        })
}*/