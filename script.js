$(function() {
  var countdown;
  
  function twoDigits(num) {
    return num < 10 ? '0' + num : num;
  }
  
  function switchSession() {
    var now = $('#when').html().toLowerCase();
    var next;
    if (now === 'session') {
      next = 'Break';
    } else {
      next = 'Session';
    }
    $('#when').html(next);
    var min = twoDigits($('#' + next.toLowerCase()).val());
    $('#mins').html(min);
  }
  
  function reset(ss, br) {
    $('#session').val(ss);
    $('#break').val(br);
    $('#mins').html(ss);
    $('#secs').html('00');
    $('#when').html('Session');
    $('input').prop('disabled', false);
    mod('auto', 1, false);
  }
  
  function mod(click, opa, input) {
    $('.mod').css('pointer-events', click);
    $('.mod').css('opacity', opa);
    $('input').prop('disabled', input);
  }
  
  function disable(mod, boo) {
    if (boo) {
      $('#' + mod).css('pointer-events', 'none');
      $('#' + mod).css('opacity', 0.65);
    } else {
      $('#' + mod).css('pointer-events', 'auto');
      $('#' + mod).css('opacity', 1);
    }
  }
  
  function limit(num, when) {
    if (when === 'session') {
      if (num > 54) {
        disable('plus-session', true);
      } else if (num < 21) {
        disable('minus-session', true);
      } else {
        disable('plus-session', false);
        disable('minus-session', false);
      } 
    } else if (when === 'break') {
      if (num > 16) {
        disable('plus-break', true);
      } else if (num < 5) {
        disable('minus-break', true);
      } else {
        disable('plus-break', false);
        disable('minus-break', false);
      } 
    }
  }
  
  reset(25, 5);
  
  $('#plus-session').click(function() {
    var value = eval($('#session').val()) + 1;
    limit(value, 'session');
    $('#session').val(value);
    $('#mins').html(twoDigits(value));
  });
  
  $('#minus-session').click(function() {
    var value = eval($('#session').val()) - 1;
    limit(value, 'session');
    $('#session').val(value);
    $('#mins').html(twoDigits(value));
  });
  
  $('#plus-break').click(function() {
    var value = eval($('#break').val()) + 1;
    limit(value, 'break');
    $('#break').val(value);
  });
  
  $('#minus-break').click(function() {
    var value = eval($('#break').val()) - 1;
    limit(value, 'break');
    $('#break').val(value);
  });
  
  $('#play').click(function() {
    mod('none', 0.65, true);
    $(this).hide();
    $('#pause').show();
    
    countdown = setInterval(function() {
      var sec = eval($('#secs').html()),
          min = eval($('#mins').html());
      if (min === 0 && sec === 0) {
        switchSession();
        $('#secs').html('00');
      } else if (sec === 0) {
        $('#mins').html(twoDigits(min - 1));
        $('#secs').html(59);
      } else {
        $('#secs').html(twoDigits(sec - 1));
      }
    }, 1000);
  });
  
  $('#pause').click(function() {
    mod('none', 0.65, true);
    $(this).hide();
    $('#play').show();
    clearInterval(countdown);
  });
  
  $('#stop').click(function() {
    var currSs = $('#session').val(),
        currBr = $('#break').val();
    clearInterval(countdown);
    $('#pause').hide();
    $('#play').show();
    reset(currSs, currBr);  
    limit(currSs, 'session');
    limit(currBr, 'break');
  })
  
});