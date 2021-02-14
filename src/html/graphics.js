export const chartView = `<div class="row edition-element">
<h4 class="center">Real Time Graphics</h4>
<div class="col s4  ">
<label for="selectQhawax">qHAWAX</label>
<select class="browser-default" name="" id="selectQhawax">
<option value="" disabled selected> Select a qHAWAX</option>
</select>
</div>
<div class="col s4  ">
<label for="selectTime">Graphic time</label>
<select class="browser-default" name="" id="selectTime">
<option value="" disabled selected> Select time in minutes</option>
<option value="5"> 5 </option>
<option value="10"> 10 </option>
<option value="15"> 15 </option>
<option value="20"> 20 </option>
<option value="25"> 25 </option>
<option value="30"> 30 </option>
<option value="60"> 60 </option>
<option value="120"> 120 </option>
</select>
</div>
<br>
<div class="col s2">
<a class="waves-effect waves-light btn" id="graphicBtn">Graph</a>
</div>
</div>
<div class="row" id="charts"></div>
</div>

`;