var demoApp = angular.module("demoApp", ['ngRoute', 'angularUtils.directives.dirPagination']);

function getMainData($scope, $http) {
  $http
    .get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(function (response) {
      let results = response.data.slice(0, 50);
      let data = [];
      results.forEach((id) => {
        $http
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => {
            data.push(response.data);
            console.log(response.data);
          });
      });
      $scope.main = data;
    });
}

function getNewData($scope, $http) {
  $http
    .get("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then(function (response) {
      let results = response.data.slice(0, 10);
      let data = [];
      results.forEach((id) => {
        $http
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => {
            data.push(response.data);
            console.log(response.data);
          });
      });
      $scope.new = data;
    });
}

function getBestData($scope, $http) {
  $http
    .get("https://hacker-news.firebaseio.com/v0/beststories.json")
    .then(function (response) {
      let results = response.data.slice(0, 10);
      let data = [];
      results.forEach((id) => {
        $http
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => {
            data.push(response.data);
            console.log(response.data);
          });
      });
      $scope.best = data;
    });
}



demoApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "getMainData",
      templateUrl: "view1.html",
    })
    .when("/new", {
      controller: "getNewData",
      templateUrl: "view2.html",
    })
    .when("/best", {
      controller: "getBestData",
      templateUrl: "view3.html",
    })
    .otherwise({ redirectTo: "/" });
})


demoApp.controller("getMainData", getMainData);
demoApp.controller("getNewData", getNewData);
demoApp.controller("getBestData", getBestData);

