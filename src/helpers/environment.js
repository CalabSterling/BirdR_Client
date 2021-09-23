let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:'
        break
    case 'birdrclient.herokuapp.com':
        APIRUL = 'https://birdr0921.herokuapp.com'
}

export default APIURL