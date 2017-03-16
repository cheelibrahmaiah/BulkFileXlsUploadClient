<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Bulk upload using xlsx file.</title>

<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />

<script src="bootstrap/js/jquery.min.js" type="text/javascript"></script>

<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

<link rel="stylesheet"
	href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" />


<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
<script
	src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>

<script type="text/javascript" src="angular/app.js"></script>

</head>

	<header> <nav class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">Excel Upload Bulk Data.</a>
		</div>

		<ul class="nav navbar-nav navbar-right" ng-controller="vnavController">
			<div ng-show="!loggedIn">
				<li><a href="#"><i class="fa fa-2x fa-home"></i></a></li>
			</div>
			<div ng-show="loggedIn">
				<li><a href="#" ng-click="logout()"><i
						class="fa fa-2x fa-sign-out" aria-hidden="true"></i></a></li>
			</div>

		</ul>
	</div>
	</nav> </header>

	<div id="main">
		<div>
			<div class="container">
				<div class="row">

					<div class="col-xs-6 col-md-4">
						<div class="panel panel-default">
							<div class="panel-body">
								<div ng-include="'templates/home-nav.html'"></div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-md-8">
						<div ng-view></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		$('#myModal').on('shown.bs.modal', function() {
			$('#myInput').focus()
		})
	</script>

	<style type="text/css">
#upld {
	color: white;
}
</style>

</body>
</html>

