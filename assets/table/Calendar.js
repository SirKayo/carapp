/*
* fn Calendar
* month @ String | Format: "YYYY-MM"
*/

function Calendar(whichMonth){
  moment.updateLocale('gb',{ week: {dow:1} });
  month = moment(whichMonth, "YYYY-MM");
  today = moment().date();
  startsFrom = month.startOf('month').format('E');
  endWith = month.daysInMonth();
  $('#today').text(moment(month).format('MMMM'));
  
  root = $('#cal').addClass('uk-tile uk-tile-default uk-padding-remove');
  offset = "<div class='uk-flex-first'></div>";
  CalendarHeader = $('<div/>',{
    class: 'uk-section uk-section-primary uk-padding-remove-bottom uk-text-center uk-width-1-1',
    html: '<h3>'+moment(month).format('MMMM')+'</h3>'
  });

  Weekdays = $('<div/>',{
    class:'uk-text-center uk-child-width-1-7',
    'uk-grid':'',
    html: function(){
        arr = [];
        moment.weekdaysShort(true).forEach(function(value){
          DayTile = $('<div/>', {
            class:'uk-tile uk-tile-secondary uk-padding-remove', 
          })
          DayTile.append($('<p/>', {class: 'uk-h5', text: value}));
          arr.push(DayTile.prop('outerHTML'));
        });
        return arr.join('');
      }
  })

  Weekdays.appendTo(CalendarHeader);
    CalendarBody = $('<div/>', {
      class: "uk-child-width-1-7 uk-text-center uk-flex-left uk-margin-remove-top uk-grid-match",
      'uk-grid':'',
      'margin':''
    });

  for(i = 1; i < startsFrom; i++)
    $(CalendarBody).append(offset)

  for(i = 1; i <= endWith; i++) {
    label = $('<span/>',{ class: 'uk-badge uk-label uk-position-top', text: i});
    if(moment(month).day()%6==0) label.addClass('uk-label-danger');
    cardHeader = $('<div/>',{
      class: 'uk-card-header',
      html: label
    });
    cardBody = $('<div/>', {
      class:'uk-card-body'
    });

    card = $('<div/>', {
      class: "uk-card uk-card-body uk-card-hover uk-card-small",
      id: moment(month).format('YYYY-MM-DD'),
    });
    card.append(cardHeader);
    card.append(cardBody);
    // cell.append(badge);
    if(i == today) card.addClass('uk-card-primary')
    card.appendTo(CalendarBody);
    month.add(1,'d')
  }
  
  
  CalendarHeader.appendTo(root)
  CalendarBody.appendTo(root)
}