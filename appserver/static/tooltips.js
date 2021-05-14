// Tooltips JS addon for Splunk
// Author: J.R. Murray <jr.murray@deductiv.net>
// Copyright Deductiv, Inc.
// Hosted @ https://github.com/deductiv/deductiv_splunk
// 2021-05-12

// Simple XML dashboard usage: 
/*
<form script="tooltips.js">
    <fieldset submitButton="false" autoRun="true">
        <input type="text" token="host" id="input_host">
            <label>Host</label>
        </input>
    </fieldset>
    <row>
        <panel>
            <html id="hide_tooltips">
            <style>#hide_tooltips { display: none }</style>
            <div id="tooltips_config">
                <![CDATA[
                    {
                        "input_host": "Tooltip for the host setting"
                    }
                ]]>
            </div>
            </html>
        </panel>
    </row>
</form>
*/

/* Steps to use: 
    1. Add the script to the <form> tag like so: 
        <form script="deductiv_splunk:tooltips.js">
    2. Add "id" fields to each form input
    3. Copy/paste the above <row> object from the example with the html panel into your dashboard.
    4. Create a JSON object within the CDATA tags with syntax:  { "field": "tooltip", "field2": "tooltip2" }        
*/
   
require(["jquery", "splunkjs/mvc/simplexml/ready!"], 
function($) { 

	var config_div = $('#tooltips_config').text();
	if ( config_div !== undefined && config_div !== null ) {
		var config = JSON.parse(config_div);
	}

	var form_inputs = $('div[data-view="views/dashboard/form/Input"]');
 	console.log("Detected the following input form IDs:");
	form_inputs.each(function (index) {
		input_id = $( this ).attr("id");
		console.log(input_id);
		if ( input_id in config) {
			$( this ).attr('title',config[input_id]).attr('data-toggle','tooltip').attr('data-placement','bottom');
		}
	});
})
