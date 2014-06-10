var perch = perch || {};

perch.loadAssociations = function(element) {
    console.log(element);

    $.getJSON('api/', function (data) {

        console.log(data);


    });
}