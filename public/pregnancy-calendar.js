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
        var res = "Now download <a href='" + url + "'>the iCalendar file</a> or add it directly to your Google Calendar " +
                "<a href='http://www.google.com/calendar/render?cid=" + encodeURI(url+"/Pregnancy.ics") +
                "' target='_blank'><img src='http://www.google.com/calendar/images/ext/gc_button6.gif' border=0></a>";
        $("#result").html(res);
        $("#details").slideUp();
        $("#results").fadeIn();
        console.log("Location: " + url);
        return false; // stay on the page
    });
});