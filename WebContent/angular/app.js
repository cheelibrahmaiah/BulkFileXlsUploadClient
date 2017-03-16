/**
 * 
 */

var myApp = angular.module("myApp", [ 'ngRoute' ]);

myApp.run(function($rootScope, LS) {
	$rootScope.currentUser = LS.getData();

	if (typeof $rootScope.currentUser === 'undefined'
			|| $rootScope.currentUser == null) {
		$rootScope.loggedIn = false;
	} else {
		$rootScope.loggedIn = true;
	}

	// console.log($rootScope.loggedIn);
	// console.log($rootScope.currentUser);

});

myApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'templates/login.html',
		controller : 'welcomeController'
	})

	.when('/register', {
		templateUrl : 'templates/register.html',
		controller : 'regController'
	})

	.when('/home', {
		templateUrl : 'templates/home.html',
		controller : 'homeController'
	})

	.when('/upload', {
		templateUrl : 'templates/upload1.html',
		controller : 'uploadController'
	})

	.when('/showStudents', {
		templateUrl : 'templates/showStudents.html',
		controller : 'showStudentsController'
	})

	.when('/upload_queue', {
		templateUrl : 'templates/uploadQueue.html',
		controller : 'uploadQueueController'
	});
});

myApp.directive('validPasswordC', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue, $scope) {
				var noMatch = viewValue != scope.myForm.pwd.$viewValue
				ctrl.$setValidity('noMatch', !noMatch)
			})
		}
	}
});

myApp
		.controller(
				'vnavController',
				[
						'$scope',
						'$rootScope',
						'$location',
						'$http',
						'LS',
						'$window',
						function($scope, $rootScope, $location, $http, LS,
								$window) {

							// console.log('Hello::' + $rootScope.loggedIn);

							$scope.currentUser = LS.getData();

							// console.log($scope.currentUser);

							if (typeof $scope.currentUser === 'undefined'
									|| $scope.currentUser == null) {
								$scope.loggedIn = false;
							} else {
								$scope.loggedIn = true;
							}

							// console.log($scope.loggedIn);

							if ($scope.loggedIn) {
								$scope.activeMenu = 'Files';
							} else {
								$scope.activeMenu = 'Home';
								// console.log('Else');
							}

							$scope.setActive = function(nav) {
								$scope.activeMenu = nav;
							}

							$scope.logout = function() {

								var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/user/logout";
								$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

								$http({
									url : uploadUrl,
									method : "POST",
									params : {
										"username" : $scope.currentUser
									}
								}).then(function(response) {
									LS.removeData();

									$window.location.replace('#/');
									$window.location.reload();

								}, function(response) { // optional
									// failed
									// console.log(response);
									$location.url('/');
								});
								// LS.setData(undefined);
							}

						} ]);

myApp.controller('welcomeController', function($scope) {

});

myApp.controller('regController', function($scope) {

});

myApp.controller('showStudentsController', function($scope, $http, $window) {

	$scope.findAllStds = function() {
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/studentsOk";
		// $http.defaults.headers.post["Content-Type"] =
		// "application/x-www-form-urlencoded";

		$http({
			url : uploadUrl,
			method : "GET"
		}).then(function(response) {
			$scope.files = response.data;
			// console.log($scope.files);
		}, function(response) { // optional
			console.log(response.data);
		});
	};

	$scope.findAllStds();

	$scope.clkStudent = function(data) {
		$scope.currentStudent = data;
		// console.log(data);
	};

	$scope.deleteStudent = function(user) {
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/delete";
		console.log(user);

		$http({
			url : uploadUrl,
			method : "POST",
			params : {
				"stdid" : user.id
			}
		}).then(function(response) {
			alert(response.data);
			$scope.findAllStds();
			$window.location.reload();

		}, function(response) { // optional
			alert(response.data);
		});
	}

});

myApp.controller('uploadQueueController', function($scope, $http, $window) {
	$scope.findAllStds = function() {
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/students";
		// $http.defaults.headers.post["Content-Type"] =
		// "application/x-www-form-urlencoded";

		$http({
			url : uploadUrl,
			method : "GET"
		}).then(function(response) {
			$scope.files = response.data;
			// console.log($scope.files);
		}, function(response) { // optional
			console.log(response.data);
		});
	};

	$scope.findAllStds();

	$scope.clkStudent = function(data) {
		$scope.currentStudent = data;
		// console.log(data);
	};

	$scope.updateStatus = function(user) {
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/status";
		// console.log(user);

		$http({
			url : uploadUrl,
			method : "POST",
			params : {
				"stdid" : user.id
			}
		}).then(function(response) {

			$scope.findAllStds();
			$window.location.reload();

		}, function(response) { // optional
			// failed
			// console.log(response);
		});

	};

	$scope.deleteStudent = function(user) {
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/delete";
		console.log(user);

		$http({
			url : uploadUrl,
			method : "POST",
			params : {
				"stdid" : user.id
			}
		}).then(function(response) {
			alert(response.data);
			$scope.findAllStds();
			$window.location.reload();

		}, function(response) { // optional
			alert(response.data);
		});
	}
});

myApp.controller('regValidateCtrl', function($scope, $http, $location,
		$rootScope, LS, $window) {

	$scope.user = {};

	Object.toparams = function ObjecttoParams(obj) {
		var p = [];
		for ( var key in obj) {
			p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	};

	$scope.createUser = function() {
		// console.log($scope.user);
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/user";
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

		$http({
			url : uploadUrl,
			method : "POST",
			data : Object.toparams($scope.user)
		}).then(function(response) {
			// success
			// console.log(response);
		}, function(response) { // optional
			// failed
			// console.log(response);
		});
	};

	$scope.validateUserCreds = function() {
		console.log($scope.user);
		var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/user/login";
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		// $rootScope.currentUser = $scope.user.username;

		$http({
			url : uploadUrl,
			method : "POST",
			data : Object.toparams($scope.user)
		}).then(function(response) {
			// success
			console.log(response.data);

			$rootScope.loggedIn = true;

			$scope.currentUser = LS.setData($scope.user.username);

			$window.location.replace('#/home');
			$window.location.reload();
			// $location.path('/home');

		}, function(response) { // optional
			// failed
			console.log(response);
			$location.path('/');
		});

		// $scope.currentUser = LS.getData();

	}

});

myApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Hello welcome';
});

myApp
		.controller(
				'homeController',
				[
						'$scope',
						'$rootScope',
						'LS',
						'$http',
						function($scope, $rootScope, LS, $http) {
							// create a message to display in our view
							$scope.message = 'Welcome to MyApp';

							$scope.currentUser = LS.getData();

							// console.log($scope.currentUser);

							if (typeof $scope.currentUser === 'undefined') {
								$scope.loggedIn = false;
							} else {
								$scope.loggedIn = true;
							}

							$scope.findAllFiles = function() {
								var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/uploadedFiles";
								// $http.defaults.headers.post["Content-Type"] =
								// "application/x-www-form-urlencoded";

								$http({
									url : uploadUrl,
									method : "GET"
								}).then(function(response) {
									$scope.files = response.data;
									// console.log($scope.files);
								}, function(response) { // optional
									console.log(response.data);
								});
							};

							$scope.findAllFiles();

						} ]);

myApp.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);

myApp.service('fileUpload', [ '$q', '$http', function($q, $http) {
	var deffered = $q.defer();
	var responseData;
	this.uploadFileToUrl = function(file, uploadUrl) {
		var fd = new FormData();
		fd.append('file', file);
		return $http.post(uploadUrl, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function(response) {

			/* $scope.errors = response.data.value; */
			// console.log(response);
			responseData = response;
			deffered.resolve(response);
			return deffered.promise;
		}).error(function(error) {
			deffered.reject(error);
			return deffered.promise;
		});

	}

	this.getResponse = function() {
		return responseData;
	}

} ]);

myApp.factory("LS", function($window, $rootScope) {
	angular.element($window).on('storage', function(event) {
		if (event.key === 'my-storage') {
			$rootScope.$apply();
		}
	});
	return {
		setData : function(val) {
			$window.localStorage
					&& $window.localStorage.setItem('my-storage', val);
			return this;
		},
		getData : function() {
			return $window.localStorage
					&& $window.localStorage.getItem('my-storage');
		},
		removeData : function(key) {
			$window.localStorage.removeItem('my-storage');
		},
		clear : function() {
			$window.localStorage.clear();
		}
	};
});

/*
 * myApp.directive('validFile', function validFile() {
 * 
 * var validFormats = ['xls', 'xlsx']; return { require: 'ngModel', link:
 * function (scope, elem, attrs, ctrl) { ctrl.$validators.validFile = function() {
 * elem.on('change', function () { var value = elem.val(), ext =
 * value.substring(value.lastIndexOf('.') + 1).toLowerCase();
 * 
 * return validFormats.indexOf(ext) !== -1; }); }; } }; });
 */

myApp
		.controller(
				'uploadController',
				[
						'$scope',
						'$q',
						'fileUpload',
						'$window',
						function($scope, $q, fileUpload, $window) {
							$scope.dataUpload = true;
							$scope.errVisibility = false;

							$scope.flag = undefined;

							// this.err = undefined;

							$scope.uploadFile = function() {
								var file = $scope.myFile;
								// console.log('file is ');

								// console.log(file);

								var validFormats = [ 'xls', 'xlsx' ];
								var ext = file.name.substring(
										file.name.lastIndexOf('.') + 1)
										.toLowerCase();
								$scope.flag = validFormats.indexOf(ext) !== -1;
								// console.log(ext + $scope.flag);

								if ($scope.flag) {
									var uploadUrl = "http://localhost:8080/BulkFileXlsUploadWS/processExcel";
									fileUpload
											.uploadFileToUrl(file, uploadUrl)
											.then(
													function(result) {
														$scope.errors = fileUpload
																.getResponse();
														// console.log($scope.errors);
														$scope.errVisibility = true;
														// alert('File uploaded
														// successfully!!');

														// console.log(result);

														alert(result.data);

														$window.location
																.replace('#/home');
														$window.location
																.reload();
													}, function(error) {
														alert(error.data);
													});
								} else {
									// this.err = 'Please uplad valid Excel(.xls
									// or .xlsx) files.';
									alert('Please uplad valid Excel(.xls or .xlsx) files.');
								}

							};
						} ]);
