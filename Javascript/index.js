document.addEventListener('load', getLocation)

function getLocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }

    function error() {
        alert('no user location found')
    }
    if (!navigat.geolocation) {
        alert("browser does not support geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
}