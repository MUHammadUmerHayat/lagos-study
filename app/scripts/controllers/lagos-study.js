angular.module('app.controller', [])
    .controller('OpenAndelaCtrl', ['$scope', '$timeout', function($scope, $timeout) {

        var clock = document.getElementById('timerDiv');
        var monthsSpan = clock.querySelector('.months');
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        var deadlineDate = document.getElementById('deadline-date');
        $scope.currentIndex = 0;
        $scope.application_process = [
            { id: 0, stage: "STAGE 1: Application", process: "First you’ll complete a free application so we can learn more about you."},{ id: 1, stage: "STAGE 2: Aptitude Assessment", process: "Once we receive your application, we’ll email you an online test that measures logical reasoning and personality fit. (You’ll receive an email with next steps within 2 days of applying)"},{ id: 2, stage: "STAGE 3: 11 Weeks Training ", process: "Successful applicants participate in a eleven-week, full-time training at an Lagos E- Learning center."}
        ];
        $scope.eligibleViewStatus = false;
        $scope.showClicked = function(id) {
            $scope.currentIndex = id;
        };
        function getTimeRemaining(endtime) {
            var timeDifference = Date.parse(endtime) - Date.parse(new Date());
            return {
                'total': timeDifference,
                'seconds': Math.floor((timeDifference / 1000) % 60),
                'minutes': Math.floor((timeDifference / 1000 / 60) % 60),
                'hours': Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
                'days': Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            };
        }

        function initializeClock(endtime) {

            function updateClock() {
                var remainingTime = getTimeRemaining(endtime);
                if (remainingTime.total <= 0) {
                    clearInterval(timeinterval);
                    clock.style.display = "none";
                    deadlineDate.innerHTML = "Registeration expired, be on the lookout for the next Registration process.";
                    return;
                }

                monthsSpan.innerHTML = ('0' + Math.floor(remainingTime.days / 31)).slice(-2);
                daysSpan.innerHTML = ('0' + remainingTime.days % 31).slice(-2);
                hoursSpan.innerHTML = ('0' + remainingTime.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + remainingTime.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + remainingTime.seconds).slice(-2);

            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        var deadline = new Date("2016-5-18");
        initializeClock(deadline);
        $scope.toggleEligibilityView = function(){
            $scope.eligibleViewStatus = !$scope.eligibleViewStatus;
        };

    }]);
