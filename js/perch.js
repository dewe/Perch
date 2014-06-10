(function () {

    var trendingFormatter = function (o) {
        return '<li>' + o.association + '</li>';
    }

    var stableFormatter = function (o) {
        return '<li>' + o.word + '</li>';
    }

    function renderAssociations(select, associations, formatter) {

        if (!associations) {
            select.html('Currently unavailable. Please try again.');
            return;
        };

        var items = [];
        $.each(associations, function (id, value) {
            items.push(formatter(value));
        });
        select.html(items.join(''));
    }

    $.getJSON('api/', function (data) {
        renderAssociations($('#trending'), data.trending, trendingFormatter);
        renderAssociations($('#stable'), data.stable, stableFormatter);
    });

})();