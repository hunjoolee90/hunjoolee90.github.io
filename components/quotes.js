const quotes = [
    {
        quote: "To live is the rarest thing in the world. Most people exist, that is all.",
        author: "Oscar Wilde"
    },
    {
        quote: "That it will never come again is what makes life so sweet.",
        author: "Emily Dickinson"
    },
    {
        quote: "It is never too late to be what you might have been.",
        author: "George Eliot"
    },
    {
        quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Pain is inevitable. Suffering is optional.",
        author: "Haruki Murakami"
    },
    {
        quote: "All the world's a stage, and all the men and women merely players.",
        author: "William Shakespeare"
    },
    {
        quote: "Be kind, for everyone you meet is fighting a hard battle.",
        author: "Plato"
    },
    {
        quote: "Unable are the loved to die for love is immortality.",
        author: "Emily Dickinson"
    },
    {
        quote: "Let me live, love, and say it well in good sentences.",
        author: "Sylvia Plath"
    },
    {
        quote: "Don't let your happiness depend on something you may lose.", 
        author: "C.S. Lewis"
    }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

function updateQuote() {
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quote.innerText = `" ${todaysQuote.quote} "`;
    author.innerText = `\n\n - ${todaysQuote.author} -`;
}

updateQuote();

setInterval(updateQuote, 5000); 
