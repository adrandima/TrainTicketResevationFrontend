



(function($){
    function insertTicketDetails( e ){
        $.ajax({
            url: 'http://localhost:8080/ticket/',
            type: 'post',
            data: JSON.stringify({
                "userId": "name1",
                "noOfTickets": $('#noOfTickets').val(),
                "tel": $('#phoneNumber').val(),
                "date": "2015-12-01",
                "time": "10:20:01",
                "start": $('#start').val(),
                "destination": $('#destination').val(),
                "trainClass": $("input[name=trainClass]:checked").val(),
                "price": 321.2
            }),
            contentType: 'application/json; charset=utf-8',
            success: function(){
                window.location.href = 'payment.html';
                alert('Success');
            },
            error: function(){
                alert('error');
            }
        });

        e.preventDefault();
    }

    function insertPaymentDetails( e ){
        $.ajax({
            url: 'http://localhost:8080/payment/',
            type: 'post',
            data: JSON.stringify({
                "userId": "payment Name",
                "fullname": $('#fullname').val(),
                "cardNumber": $('#cardNumber').val(),
                "expireMonth": $('#ex_Month').val(),
                "expireYear": $('#ex_Year').val(),
                "cvcCode": $('#cvcCode').val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function(){

                alert('Payment fill Success');

            },
            error: function(){
                alert('Payment error');
            }
        });

        e.preventDefault();
    }




    $('#ticketReservationForm').submit( insertTicketDetails );
    $('#paymentForm').submit( insertPaymentDetails );
})(jQuery);


