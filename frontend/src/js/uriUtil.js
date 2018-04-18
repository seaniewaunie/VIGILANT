export default class uri {
  constructor(start_date, end_date) {
    if(start_date == null && end_date == null){
      this.start_date = '';
      this.end_date = '';
    }
    else{
      this.start_date = start_date;
      this.end_date = end_date;
    }
    this.start_time = '';
    this.end_time = '';
    this.days = [];
  }

  set setStartDate(start_date){
    this.start_date = start_date;
  }

  set setEndDate(end_date){
    this.end_date = end_date;
  }

  set setStartTime(start_time){
    this.start_time = start_time;
  }

  set setEndTime(end_time){
    this.end_time = end_time;
  }



  get getStartDateString(){
    return this.start_date.toISOString().substr(0, 10);
  }

  get getEndDateString(){
    return this.end_date.toISOString().substr(0, 10);
  }

  get getString(){
    return this.formatString();
  }

  formatString(){
    var start_yr_month_day = '', end_yr_month_day = '';
    var start_hh_mm_dd, end_hh_mm_dd;
    // YYYY-MM-DD
    // HH:MM:SS
    if(this.start_date != '' && this.end_date != ''){
      start_yr_month_day = this.start_date.toISOString().substr(0, 10);
      end_yr_month_day = this.end_date.toISOString().substr(0, 10);
    }

    //start_hh_mm_dd = this.start_date.toISOString().substring(11, 19);
    start_hh_mm_dd = this.start_time;
    //end_hh_mm_dd = this.end_date.toISOString().substring(11, 19);
    end_hh_mm_dd = this.end_time;
    return (
      'start_date=' + start_yr_month_day +
      '&end_date=' + end_yr_month_day +
      '&start_time=' + start_hh_mm_dd +
      '&end_time=' + end_hh_mm_dd
    );
  }
}
