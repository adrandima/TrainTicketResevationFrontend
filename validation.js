function getUserDetails(){
    var nic;
    var databaseNic;
    $.ajax({
        url: 'http://localhost:8080/card/'+ $("#nic").val(),
        type: 'get',
        contentType: 'application/json; charset=utf-8',
        dataType:'json',
        success: function(data){
            nic= $('#nic').val();
            databaseNic = data.nic;
            console.log(data);
            console.log(nic);



        },
        error: function(){
            return 1;
        }
    });
    if(_.isEqual(JSON.stringify(nic),JSON.stringify(databaseNic))){
        return 0.9;
    }else{
        return 1;
    }
}

function redirectToPayment(){
    var data={
        "noOfTickets": $('#noOfTickets').val(),
        "phoneNumber": $('#phoneNumber').val(),
        "selectedClass": $("#selectedClass :selected").text()

    };
    console.log(data);
    localStorage["ticketDetails"] = JSON.stringify(data);
    window.location.href = 'payment.html';
    alert("success");


}



function createTrainReservation(){

    var trainStartPlace = localStorage["trainStartPlace"];
    var trainDestinationPlace = localStorage["trainDestinationPlace"];
    var paymentDetails = JSON.parse(localStorage["paymentDetails"]);
    var ticketDetails = JSON.parse(localStorage["ticketDetails"]);
    var ticketPrice = JSON.parse(localStorage["ticketPrice"]);
    var trainDetails = JSON.parse(localStorage["trainDetails"]);



    $.ajax({
        url: 'http://localhost:8080/ticket/',
        type: 'post',
        data: JSON.stringify({
            "nic": paymentDetails.nic,
            "name": paymentDetails.name,
            "train": trainDetails.trainNo,
            "noOfTickets": ticketDetails.noOfTickets,
            "classType": ticketDetails.selectedClass,
            "start": trainStartPlace,
            "destination": trainDestinationPlace,
            "cost": ticketPrice
        }),
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log("Test  success");
            alert('Success');
            localStorage.clear();
            window.location.href = "http://localhost:63342/TrainTicketResevationFrontend/trainDetails.html?_ijt=jv7h90sn1qm3edj31kqf21h739";

        },
        error: function(){
            alert('error');
            localStorage.clear();
            window.location.href = "http://localhost:63342/TrainTicketResevationFrontend/trainDetails.html?_ijt=jv7h90sn1qm3edj31kqf21h739";
        }
    });


}


(function($){


    function insertPaymentDetails( e ){
        console.log($("#cardNumber").val());
        console.log("Test amount");
        console.log($('#ticketPriceSum').text());
        $.ajax({
            url: 'http://localhost:8080/card/'+ $("#cardNumber").val(),
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType:'json',
            success: function(data){
                var insertedPaymentDetails={
                    "name": $('#name').val(),
                    "nic": $('#nic').val(),
                    "cardNumber": $('#cardNumber').val(),
                    "expireMonth": $('#ex_Month').val(),
                    "expireYear": $('#ex_Year').val(),
                    "cvcCode": parseFloat($('#cvcCode').val())
                }
                console.log("database data");
                var databaseData ={
                    "name": data.name,
                    "nic": data.nic,
                    "cardNumber": data.cardNumber,
                    "expireMonth": data.expireMonth,
                    "expireYear": data.expireYear,
                    "cvcCode": data.cvcCode
                }

                console.log(insertedPaymentDetails);
                console.log(databaseData);
                if(_.isEqual(JSON.stringify(insertedPaymentDetails),JSON.stringify(databaseData))){
                    if($('#ticketPriceSum').text()<=data.amount){
                        localStorage["paymentDetails"] =JSON.stringify(databaseData);
                        window.location.href = 'ticketConfirmationPage.html';
                        alert('Payment Success');

                    }else{
                        alert('Low Balance');
                    }


                }else{
                    console.log("Payment error Re-enter!");                }


            },
            error: function(){
                alert('Payment error');
            }
        });

        e.preventDefault();
    }













    $('#paymentForm').submit( insertPaymentDetails );

})(jQuery);


