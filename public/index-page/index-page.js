document.addEventListener('DOMContentLoaded', function () {
    var serverStatus = document.getElementById('server-status');

    var checkServerStatus = function checkServerStatus() {
        fetch('/status').then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status === 'ok') {
                serverStatus.classList.add('online');
                serverStatus.classList.remove('offline');
            } else {
                serverStatus.classList.add('offline');
                serverStatus.classList.remove('online');
            }
        }).catch(function (error) {
            console.error(error);
            serverStatus.classList.add('offline');
            serverStatus.classList.remove('online');
        });
    };
});