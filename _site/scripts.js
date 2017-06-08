// Form input animation
$('.field__input').on('input', function() {
  var $field = $(this).closest('.field');
  if (this.value) {
    $field.addClass('field--not-empty');
  } else {
    $field.removeClass('field--not-empty');
  }
});

// Adds question mark to each input field and creates hover
$('<img class="questionMark" src="img/questionMark.svg"/>').insertAfter("input");
$('.questionMark').hover(function() { 
    $(this).toggleClass('show');
  }
)

// Adds arrow for select field
$('<img class="questionMark" src="img/downArrow.svg"/>').insertAfter("select");

// Adds commas to numbers and strip out any letters
$('input').keyup(function(event) {
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ;
  });
});

// Rounds and abbreviates numbers
function abbreviateNumber(x) {
  if(isNaN(x)) return x;

  if(x < 9999) {
    return x.toFixed(2);
  }

  if(x < 1000000) {
    return Math.round(x/1000) + "K";
  }

  if( x < 10000000) {
    return (x/1000000).toFixed(1) + "M";
  }

  if(x < 1000000000) {
    return (x/1000000).toFixed(1) + "M";
  }

  if(x < 1000000000000) {
    return (x/1000000000).toFixed(1) + "B";
  }

  return "1T+";
}

// Limits 'Annual Agent Attrition' filed to 2 digits only
var max_chars = 2;
$('#agentAttrition').keydown( function(e){
    if ($(this).val().length >= max_chars) { 
        $(this).val($(this).val().substr(0, max_chars));
    }
});
$('#agentAttrition').keyup( function(e){
    if ($(this).val().length >= max_chars) { 
        $(this).val($(this).val().substr(0, max_chars));
    }
});

// Smooth scrolling
$("#button").click(function() {
    $('html, body').animate({
        scrollTop: $("#d3Graph").offset().top
    }, 800);
});

$("#goUp").click(function() {
    $('html, body').animate({
        scrollTop: $("#hero").offset().top
    }, 800);
});

var percent = 0;
var averageCPA = 0;

$('#industry').change(function() {
  if ($(this).val() == 'advocacy') {
    percent = .0461;
    averageCPA = 37.31;
  }  else if ($(this).val() == 'auto') {
    percent = .0227;
    averageCPA = 63.00;
  } else if ($(this).val() == 'b2b') {
    percent = .0258;
    averageCPA = 63.37;
  } else if ($(this).val() == 'consumerServices') {
    percent = .0500;
    averageCPA = 75.40;
  } else if ($(this).val() == 'dating&personals') {
    percent = .0275;
    averageCPA = 6.91;
  } else if ($(this).val() == 'eCommerce') {
    percent = .0191;
    averageCPA = 46.07;
  } else if ($(this).val() == 'education') {
    percent = .0413;
    averageCPA = 42.13;
  } else if ($(this).val() == 'employmentServices') {
    percent = .0397;
    averageCPA = 105.79;
  } else if ($(this).val() == 'finance&insurance') {
    percent = .0719;
    averageCPA = 51.74;
  } else if ($(this).val() == 'health&medical') {
    percent = .0251;
    averageCPA = 126.29;
  } else if ($(this).val() == 'homeGoods') {
    percent = .0368;
    averageCPA = 86.68;
  } else if ($(this).val() == 'industrialServices') {
    percent = .0258;
    averageCPA = 77.52;
  } else if ($(this).val() == 'legal') {
    percent = .0435;
    averageCPA = 135.17;
  } else if ($(this).val() == 'realEstate') {
    percent = .0440;
    averageCPA = 41.14;
  } else if ($(this).val() == 'technology') {
    percent = .0255;
    averageCPA = 69.80;
  } else if ($(this).val() == 'travel&hospitality') {
   percent = .0257;
   averageCPA =  60.31;
  }
});

var monthlyMobileVisits = 0;
var adwordsPaidSearch = 0;
var mobileVisits = 0;

$('#monthlyMobileVisits').change(function() {
   monthlyMobileVisits = parseFloat(document.getElementById("monthlyMobileVisits").value.replace(/,/g, ''));
    console.log("inside: " + monthlyMobileVisits);
});

$('#adwordsPaidSearch').change(function() {
    adwordsPaidSearch = parseFloat(document.getElementById("adwordsPaidSearch").value.replace(/,/g, '')/100);
    console.log("inside 2: " + adwordsPaidSearch);
    
    mobileVisits = monthlyMobileVisits * adwordsPaidSearch;
    $('#interactions').val(mobileVisits);
});

//document.write(#interactions).innerHTML(mobileVisits);

// Takes the input values and puts them into a bar graph using D3
function outputname() {

  // Resets the graph
  d3.select("svg").remove();

  //insert html here
  
  var mobileSearchConversion = mobileVisits * percent;
  var costBasedOffIndustry = mobileSearchConversion * averageCPA;

  var increaseVolumeConservative = mobileSearchConversion * .05;
  var increaseVolumeModerate = mobileSearchConversion * .10;  
  var increaseVolumeAggressive = mobileSearchConversion * .15;

  var increaseDollarConservative = costBasedOffIndustry * .05;
  var increaseDollarModerate = costBasedOffIndustry * .10;
  var increaseDollarAggressive = costBasedOffIndustry * .15;

  // Adds up the values of blue part + orange part
  /*var sum = [
    conservativeBar[0] + conservativeBar[1],
    aggressiveBar[0] + aggressiveBar[1]
  ];*/
  //document.getElementById('summary').innerHTML =  "$" + abbreviateNumber(sum[1]) + " is the most likely benefit when adhering to our digital strategy."

  // D3 Graph
  setTimeout(function() {
    function d3graph() {

    var data = [
      mobileSearchConversion,
      increaseVolumeConservative,
      increaseVolumeModerate,
      increaseVolumeAggressive
    ];

    function conservativeBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[1];
      return myArray;
    }

    function moderateBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[2];
      return myArray;
    }

    function aggressiveBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[3];
      return myArray;
    }

    var conservativeBar = conservativeBar();
    var moderateBar = moderateBar();
    var aggressiveBar = aggressiveBar();

    // Creating a data set of the calculated values from above for our graph
    var data2 = [
      {outcome: 'Conservative', A: conservativeBar[0], B: conservativeBar[1]},
      {outcome: 'Moderate', A: moderateBar[0], B: moderateBar[1]},
      {outcome: 'Agressive', A: aggressiveBar[0], B: aggressiveBar[1]}
    ];

      var xData = ["A", "B"];

      // Setup SVG
      var margin = {top: 20, right: 50, bottom: 30, left: 50},
          width = 475 - margin.left - margin.right,
          height = 350 - margin.top - margin.bottom;

      var svg = d3.select("#graph1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Set x, y and colors    
      var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

      var y = d3.scale.linear()
        .rangeRound([height, 0]);

      var color = ["#5879DA", "#ACBCED"];

      var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

      // Transpose the data into layers
      var dataIntermediate = xData.map(function (c) {
        return data2.map(function (d) {
          return {x: d.outcome, y: d[c]};
        });
      });

      var dataStackLayout = d3.layout.stack()(dataIntermediate);

      x.domain(dataStackLayout[0].map(function (d) {
        return d.x;
      }));

      y.domain([0, d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) {
          return d.y0 + d.y;
        })
      ]).nice();

      y.domain([0, 3000000]);

      // Define and draw axis
      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("font-family", "open sans")
        .style("fill","#535353")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("font-family", "open sans")
        .style("fill","#535353")
        .call(yAxis);

      // Create groups for each series, rects for each segment 
      var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter()
        .append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
          return(color[i]);
        });

      layer.selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.x);
        })
        .attr("y", function(d) {
          return height;
        })
        .attr("height", 0)
        .transition()
        .duration(600)
        .attr("y", function (d) {
          return y(d.y + d.y0);
        })
        .attr("height", function (d) {
          return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());
    }
    d3graph();
  },600);
  
  setTimeout(function() {
    function d3graph() {

    var data = [
      costBasedOffIndustry,
      increaseDollarConservative,
      increaseDollarModerate,
      increaseDollarAggressive
    ];

    function conservativeBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[1];
      return myArray;
    }

    function moderateBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[2]; 
      return myArray;
    }

    function aggressiveBar() {
      var myArray = new Array();
      myArray[0] = data[0];
      myArray[1] = data[3];
      return myArray;
    }

    var conservativeBar = conservativeBar();
    var moderateBar = moderateBar();
    var aggressiveBar = aggressiveBar();

    // Creating a data set of the calculated values from above for our graph
    var data2 = [
      {outcome: 'Conservative', A: conservativeBar[0], B: conservativeBar[1]},
      {outcome: 'Moderate', A: moderateBar[0], B: moderateBar[1]},
      {outcome: 'Agressive', A: aggressiveBar[0], B: aggressiveBar[1]}
    ];

      var xData = ["A", "B"];

      // Setup SVG
      var margin = {top: 20, right: 50, bottom: 30, left: 50},
          width = 475 - margin.left - margin.right,
          height = 350 - margin.top - margin.bottom;

      var svg = d3.select("#graph2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Set x, y and colors    
      var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

      var y = d3.scale.linear()
        .rangeRound([height, 0]);

      var color = ["#FF720B", "#FFB985"];

      var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

      // Transpose the data into layers
      var dataIntermediate = xData.map(function (c) {
        return data2.map(function (d) {
          return {x: d.outcome, y: d[c]};
        });
      });

      var dataStackLayout = d3.layout.stack()(dataIntermediate);

      x.domain(dataStackLayout[0].map(function (d) {
        return d.x;
      }));

      y.domain([0, d3.max(dataStackLayout[dataStackLayout.length - 1],
        function (d) {
          return d.y0 + d.y;
        })
      ]).nice();

      y.domain([0, 100000000]);

      // Define and draw axis
      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("font-family", "open sans")
        .style("fill","#535353")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("font-family", "open sans")
        .style("fill","#535353")
        .call(yAxis);

      // Create groups for each series, rects for each segment 
      var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter()
        .append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
          return(color[i]);
        });

      layer.selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.x);
        })
        .attr("y", function(d) {
          return height;
        })
        .attr("height", 0)
        .transition()
        .duration(600)
        .attr("y", function (d) {
          return y(d.y + d.y0);
        })
        .attr("height", function (d) {
          return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());
    }
    d3graph();
  },600);
};




