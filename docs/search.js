// search.js
window.addEventListener('load', function() {
    // Lunr.js search index setup
    var idx = lunr(function() {
        this.field('title');
        this.field('body');
        this.ref('id');
    });

    // Define a list to hold your markdown pages
    var documents = [
        // Example documents to add to the search index
        {
            id: 1,
            title: 'Page 1',
            body: 'This is the content of page 1.',
            url: 'page1.html'
        },
        {
            id: 2,
            title: 'Page 2',
            body: 'This is the content of page 2.',
            url: 'page2.html'
        },
        {
            id: 3,
            title: 'Page 3',
            body: 'This is the content of page 3.',
            url: 'page3.html'
        }
    ];

    // Add documents to the Lunr index
    documents.forEach(function(doc) {
        idx.add(doc);
    });

    // Create search function
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.trim();

        // If the query is empty, reset results
        if (query.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        var results = idx.search(query);
        searchResults.innerHTML = results.map(function(result) {
            var doc = documents.find(function(doc) {
                return doc.id == result.ref;
            });
            return '<a href="' + doc.url + '">' + doc.title + '</a>';
        }).join('<br>');
    });
});
