export const viewDownload = `
<div class="row background-download">
<div class="col s12 m6 offset-s0.5 offset-m3">
<div class="card-pannel z-depth-5">
<form action=""class="form-download">
<h5 class="center-align">Download the hourly average air quality data</h5><br>
<div class="row">
<div class="col s10 m6 offset-s1 offset-m3">
<select class="browser-default center-align" name="" id="selectQhawax">
<option value="" disabled selected> Select a qHAWAX</option>
</select>
</div>
</div>
<div class="container">
<div class="row center-align">
<div class="col s6">
<label for="initDate">Initial Date</label>
<input type="text" class="datepicker center-align" name="initDate">
</div>
<div class="col s6">
<label for="initHour">Initial Time</label>
<input type="text" class="timepicker center-align" name="initHour">
</div>
</div>
</div>
<div class="container">
<div class="row center-align">
<div class="col s6">
<label for="endDate">Final Date</label>
<input type="text" class="datepicker center-align" name="endDate">
</div>
<div class="col s6">
<label for="endHour">Final Time</label>
<input type="text" class="timepicker center-align" name="endHour">
</div>
</div>
<div class="row">
<div class="center-align">
<button id="submit-btn" class="btn waves-effect waves-light" >Download
<i class="material-icons right">send</i>
</button>
</div>
</div>
</form>
<p class="center"><strong><sub>
The data has not passed a quality control.</sub></strong></p>
</div>
</div>
</div>`;