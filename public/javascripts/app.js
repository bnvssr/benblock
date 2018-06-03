// public/javascripts/app.js

function addTransaction() {

  let data = {
    "from": $('#fromAddress').val(),
    "to": $('#toAddress').val(),
    "amount": $('#amount').val(),
    "chain": localStorage.getItem("Blockchain")
  }

  $.ajax({
    url: '/tt/createTransaction',
    type: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: data,
    success: function (response) {
      localStorage.setItem('Blockchain', JSON.stringify(response));
      showBlockchain();
    },
    error: function (response) {}
  });

}

function initBlockchain() {

  localStorage.removeItem('Blockchain');

  var url = "/tt/initBlockchain";

  $.ajax({
    url: url,
    type: 'GET',
    success: function (response) {
      localStorage.setItem('Blockchain', JSON.stringify(response));
      showBlockchain();
    },
    error: function (response) {
      console.log('response:', response);
    }
  });

}

function mineBlock() {

  let data = {
    "address": $('#mineAddress').val(),
    "chain": localStorage.getItem("Blockchain")
  }

  if (data.address.length === 0) {
    alert("No miner's address");
  } else {
    $.ajax({
      url: '/tt/mineBlock',
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: data,
      success: function (response) {
        localStorage.setItem('Blockchain', JSON.stringify(response));
        showBlockchain();
      },
      error: function (response) {
        console.log(response);
      }
    });
  };
}

function getBalance() {

  console.log('getBalance');

  let data = {
    "address": $('#balanceAddress').val(),
    "chain": localStorage.getItem("Blockchain")
  }
  var url = "/tt/getBalance";
  if (data.address.length === 0) {
    alert("No balance address");
  } else {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: data,
      success: function (response) {
        document.getElementById("current").innerHTML = response.balance;
      },
      error: function (response) {
        console.log(response);
      }
    });
  };
}

function showBlockchain() {

  const trustedTrade = JSON.parse(localStorage.getItem('Blockchain'));

  if (trustedTrade !== undefined) {
    document.getElementById("current").innerHTML = JSON.stringify(trustedTrade, undefined, 2);
  }
}
