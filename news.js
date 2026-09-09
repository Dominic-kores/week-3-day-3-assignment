// ------------------------------
// News Headline Aggregator
// ------------------------------

const categorySelect =
    document.getElementById("category");

const newsContainer =
    document.getElementById("news-container");

const newsStatus =
    document.getElementById("news-status");


// ------------------------------
// Optional GNews API key
// ------------------------------

// Leave this empty to use sample data.
const GNEWS_API_KEY = "";


// ------------------------------
// Sample articles
// ------------------------------

const sampleArticles = [

    {
        title: "Safaricom Launches New Digital Payment Feature",
        source: {
            name: "Technology Africa"
        },
        publishedAt: "2026-09-08T08:30:00Z",
        url: "https://example.com",
        category: "technology"
    },

    {
        title: "Kenya's Technology Sector Continues to Grow",
        source: {
            name: "Africa Tech News"
        },
        publishedAt: "2026-09-07T10:00:00Z",
        url: "https://example.com",
        category: "technology"
    },

    {
        title: "AI Tools Transform African Businesses",
        source: {
            name: "Digital Africa"
        },
        publishedAt: "2026-09-06T12:00:00Z",
        url: "https://example.com",
        category: "technology"
    },

    {
        title: "Kenyan Startups Attract New Investment",
        source: {
            name: "Business Daily"
        },
        publishedAt: "2026-09-08T11:00:00Z",
        url: "https://example.com",
        category: "business"
    },

    {
        title: "East African Trade Records Strong Growth",
        source: {
            name: "East Africa Business"
        },
        publishedAt: "2026-09-06T09:00:00Z",
        url: "https://example.com",
        category: "business"
    },

    {
        title: "Small Businesses Adopt Digital Payment Systems",
        source: {
            name: "African Business News"
        },
        publishedAt: "2026-09-05T15:00:00Z",
        url: "https://example.com",
        category: "business"
    },

    {
        title: "Kenyan Athletes Prepare for International Competition",
        source: {
            name: "Sports Africa"
        },
        publishedAt: "2026-09-08T07:30:00Z",
        url: "https://example.com",
        category: "sports"
    },

    {
        title: "Football Development Programs Expand Across Africa",
        source: {
            name: "African Sports"
        },
        publishedAt: "2026-09-07T14:00:00Z",
        url: "https://example.com",
        category: "sports"
    },

    {
        title: "New Digital Health Programs Reach Rural Communities",
        source: {
            name: "Health Africa"
        },
        publishedAt: "2026-09-08T06:00:00Z",
        url: "https://example.com",
        category: "health"
    },

    {
        title: "Hospitals Introduce New Patient Technology",
        source: {
            name: "Health Today"
        },
        publishedAt: "2026-09-07T16:00:00Z",
        url: "https://example.com",
        category: "health"
    }

];


// ------------------------------
// Format date
// ------------------------------

const formatDate = (dateString) => {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-AU",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
};


// ------------------------------
// Display news
// ------------------------------

const displayArticles = (articles) => {

    // Remove old articles
    newsContainer.innerHTML = "";

    if (articles.length === 0) {

        newsStatus.textContent =
            "No articles found.";

        return;
    }

    articles.forEach(
        (article) => {

            // Create article card
            const articleCard =
                document.createElement("article");

            articleCard.classList.add(
                "news-card"
            );


            // Article title
            const title =
                document.createElement("h2");

            title.textContent =
                article.title;


            // Source
            const source =
                document.createElement("p");

            source.textContent =
                `Source: ${article.source.name}`;


            // Published date
            const publishedDate =
                document.createElement("p");

            publishedDate.textContent =
                `Published: ${formatDate(
                    article.publishedAt
                )}`;


            // Read more link
            const readMore =
                document.createElement("a");

            readMore.textContent =
                "Read More";

            readMore.href =
                article.url;

            readMore.target =
                "_blank";

            readMore.rel =
                "noopener noreferrer";


            // Add elements to card
            articleCard.append(
                title,
                source,
                publishedDate,
                readMore
            );


            // Add article card to page
            newsContainer.appendChild(
                articleCard
            );
        }
    );
};


// ------------------------------
// Load news
// ------------------------------

const loadNews = async (category) => {

    newsStatus.textContent =
        "Loading news...";

    newsContainer.innerHTML = "";

    try {

        // --------------------------
        // Use live API if API key exists
        // --------------------------

        if (GNEWS_API_KEY) {

            const url =
                `https://gnews.io/api/v4/top-headlines` +
                `?category=${category}` +
                `&lang=en` +
                `&max=10` +
                `&apikey=${GNEWS_API_KEY}`;


            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "Unable to fetch news."
                );
            }


            const data =
                await response.json();


            newsStatus.textContent = "";

            displayArticles(
                data.articles.slice(0, 10)
            );

            return;
        }


        // --------------------------
        // Sample-data version
        // --------------------------

        const filteredArticles =
            sampleArticles.filter(
                (article) =>
                    article.category ===
                    category
            );


        newsStatus.textContent =
            "Using sample news data.";

        displayArticles(
            filteredArticles
        );

    } catch (error) {

        newsStatus.textContent =
            "Unable to load news. Please try again.";

        console.error(error);
    }
};



// ------------------------------
// Category filter
// ------------------------------

categorySelect.addEventListener(
    "change",
    () => {

        loadNews(
            categorySelect.value
        );
    }
);


// Load Technology when page opens
loadNews(
    categorySelect.value
);