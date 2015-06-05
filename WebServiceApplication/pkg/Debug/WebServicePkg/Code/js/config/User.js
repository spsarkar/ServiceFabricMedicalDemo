import jwt_decode from 'jwt-decode'

export default class User {
    constructor() {
        this.idToken = getIdToken();
        this.profile = jwt_decode(this.idToken);
        this.expiryDate = new Date(this.profile.exp * 1000);
    }
    
    logout() {
        localStorage.removeItem('id_token')
        window.location = '/logout';
    }
}

function getIdToken() {
    var idToken = localStorage.getItem('id_token')

    if (!idToken || location.hash !== '') {
        if (location.hash === '') {
            $('body').append('<br/>No id_token, please get one.');
        } else {
            // Save the JWT token
            var idToken = location.hash.slice(1);
            localStorage.setItem('id_token', idToken);

            // Remove ugly JWT token from URL
            history.pushState("", document.title, window.location.pathname);
        }
    }

    return idToken;
}
