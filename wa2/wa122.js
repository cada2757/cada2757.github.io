const quoteButton = document.querySelector('#js-new-quote');
const helpButton = document.querySelector('#js-tweet');

const quoteText = document.querySelector('#js-quote-text');

quoteButton.addEventListener('click', getAdvice);
helpButton.addEventListener('click', goToHelp);

async function getAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();

        if (!response.ok) {
            throw Error(response.statusText);
        }

        displayQuote(data.slip.advice);
    } catch (err) {
        console.error(err);
        alert('u suck LMAO');
    }
}

function displayQuote(advice) {
    quoteText.textContent = advice;
}

function goToHelp() {
    window.location.href = 'https://www.betterhelp.com/get-started/?go=true&utm_source=AdWords&utm_medium=Search_PPC_c&utm_term=dbt+therapy+online_b&utm_content=134506249665&network=g&placement=&target=&matchtype=b&utm_campaign=16718352460&ad_type=text&adposition=&kwd_id=kwd-299568333093&gad_source=1&gbraid=0AAAAADqBHibPmlg96KKMuf-I1nZGOXjvT&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkUUmYG-wXX6e3yTpO1RHGN0QvMknApv1clnYSeq83TV71oRpE5wKH8aAhhPEALw_wcB&not_found=1&gor=start';
}