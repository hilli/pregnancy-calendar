$(document).ready(function() {
    $("#results").hide();

    $("#datepicker").datepicker({
        firstDay: 1,
        showAnim: 'fold',
        dateFormat: "yy-mm-dd",
        onSelect: function(dateText, ui) {
            document.getElementById("dateDisplay").innerHTML = dateText;
        }
    });

    $("#days_in_cycle").slider({
        value: 28,
        max: 45,
        min: 22,
        slide: function(event, ui) {
            document.getElementById("rangeDisplay").innerHTML = ui.value;
        }
    });

    $("#luteal_phase").slider({
        value: 14,
        max: 16,
        min: 9,
        slide: function(event, ui) {
            document.getElementById("lutealDisplay").innerHTML = ui.value;
        }
    });

    $("#form").submit(function(e) {
            e.preventDefault();
            dato = $("#datepicker").datepicker("getDate");
            days_in_cycle = $("#days_in_cycle").slider("value");
            luteal_period = $("#luteal_phase").slider("value");
            url = location.href + "ical/" + dato.getFullYear() + "/" + (dato.getMonth()+1) + "/" + dato.getDate() + "/" + days_in_cycle + "/" + luteal_period;
            //document.getElementById("#result").innerHTML = "<a href='" + url + "'>Download iCal file</a>";
            $("#gcal").href = "http://www.google.com/calendar/render?cid=" + escape(url);  // .setAttribute("href", "http://www.google.com/calendar/render?cid=" + escape(url));
            $("#details").slideUp();
            $("#results").fadeIn();
            console.log("Location: " + url);
            return false; // stay on the page
            });
});