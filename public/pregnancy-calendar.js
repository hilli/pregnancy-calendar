function hasRangeSupport() {
    var element = document.createElement('input');
    element.setAttribute("type","range");
    return (element.type !== "text");
}

function showIfSupported (displaytag) {
    if(!hasRangeSupport()) {
        document.getElementById(displaytag).innerHTML = ""
    }
}

function showRangeValue(newValue, displaytag) {
    if(hasRangeSupport()) {
	    document.getElementById(displaytag).innerHTML=newValue;
    } else {
        document.getElementById(displaytag).innerHTML = "";
    }
}

$(document).ready(function() {
    $("#datepicker").datepicker();

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

    $("form").submit(function() {
            dato = $("#datepicker").value;
            luteal_period = $("#luteal_phase").value;
            $.post("/post", { date: dato, luteal: luteal_period  })
            });
});