// GEt quote from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];


//show loader

function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
//hide loader
function complete() {
    quoteContainer.hidden=false;
    loader.hidden=true;
}
//new Quote

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    if(!quote.author)
    {
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length>80)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
         apiQuotes = await response.json();
         newQuote();
    }
    catch(error){
        // alert(error)
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


//to load
getQuotes();