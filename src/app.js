let registerServiceWorker = () => {
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('Service Worker Registered Successfully');
    });

    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
};

let makeRequest = (url) => {
    axios.get(url).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
};

// Register Service Worker
// registerServiceWorker();

// When size is submitted by the user, call makeGrid()
$(document).ready(() => {
    let $convert_button = $('#convert'),
        $currency_from = $('#currency_from'),
        $currency_to = $('#currency_to'),
        $currency_value = $('#currency_value'),
        conversion = {from: 0, to: 0},
        base_url = 'https://free.currencyconverterapi.com/api/v5/',
        currencies = makeRequest(`${base_url}currencies`);

    $convert_button.on('click', function (e) {
        // Prevent default action (reloading page) when Submit input is clicked
        e.preventDefault();
        conversion['to'] = $currency_to.val();
        conversion['from'] = $currency_from.val();

        let query = `${conversion['from']}_${conversion['to']}`;
        let url = `${base_url}convert?compact=ultra&q=${query}`;

        makeRequest(url);
    });
});