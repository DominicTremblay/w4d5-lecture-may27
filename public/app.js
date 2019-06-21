$(document).ready(() => {
  console.log('document loaded');

  $.ajax({
    url: 'http://localhost:3000/api/login',
    method: 'POST',
    // crossDomain: true,
    dataType: 'json',
    // headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    data: { email: 'peach@princesspeach.com', password: 'test' },
  })
    .done(token => {
      // save it in local storage
      console.log(token);
      localStorage.setItem('jwt', token.token);
    })
    .catch(error => console.log(error));

  console.log(localStorage.getItem('jwt'));

  $.ajax({
    url: 'http://localhost:3000/api/hello',
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('jwt'),
    },
  }).done(response => {
    console.log(response);
  });
});
