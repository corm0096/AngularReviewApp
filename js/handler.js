angular.module("ReviewApp",['pascalprecht.translate'])
.config(function($translateProvider)
{
	console.log("Translate?");
	$translateProvider.translations('en',
	{
    	heading: 'English',
    	clicker: 'Changez langue',
		nick: 'Author Name',
		review: 'Your Review',
		title: 'Angular Reviews',
		by: "by: "
  	});
	$translateProvider.translations('fr',
    {
		heading: 'Francais',
		clicker: 'Change language',
		nick: 'Nom de plume',
		review: 'Votre critique',
		title: "Critiques d'Angular",
		by: "par : "
	});
	$translateProvider.preferredLanguage('en');
})


.controller("HeaderCtrl",function($scope,$translate)
{
		$scope.lang=JSON.parse(localStorage.getItem("reviewapp-lang"));
		if ($scope.lang==undefined)
		{
			$translate.use($scope.lang);
		};

	$scope.setlang = function(clickedLang)
	{
		$scope.lang=clickedLang;
		localStorage.setItem("reviewapp-lang",JSON.stringify($scope.lang));
		$translate.use($scope.lang);
		console.log("Clicked.");
	};

	$scope.toglang = function()
	{
		$scope.lang=($scope.lang=="en")?"fr":"en";
		localStorage.setItem("reviewapp-lang",JSON.stringify($scope.lang));
		$translate.use($scope.lang);
	};
})

.controller("MainCtrl",function($scope,$translate)
{
	$scope.order=[{key:0, text:'Created (asc)'},{key:1,text:'Created (dec)'}];
	$scope.reviews=JSON.parse(localStorage.getItem("reviewapp-reviews"));
	if ($scope.reviews==undefined) {$scope.reviews=[];}
	$scope.sort = $scope.order[0];
	$scope.count=$scope.reviews.length;
	$scope.rev1="";
	$scope.rev1date="empty";
	$scope.rev2="";
	$scope.rev2date="empty";
	
	$scope.saveReview=function()	
	{
		$scope.count=$scope.reviews.push({name:$scope.nickname,review:$scope.reviewText,date:new Date()});
		localStorage.setItem("reviewapp-reviews",JSON.stringify($scope.reviews));
		$scope.reviewShow(0);
	};
	$scope.reviewShow=function(index)
	{
		console.log(index);
		if ($scope.count==0)
		{
			$scope.rev1=false;
			$scope.rev1date="";
		}	
		else
		{
			$scope.rev1=$scope.reviews[index];
			$scope.rev1date=Date($scope.rev1.date.toString()).substring(0,15);
		}
		if (index+1>$scope.count-1)
		{
			$scope.rev2=false;
			$scope.rev2date="";
		}
		else
		{
			$scope.rev2=$scope.reviews[index+1];
			$scope.rev2date=Date($scope.rev2.date.toString()).substring(0,15);
		}
	};

	$scope.sortChanged=function()
	{
		console.log("Order changed:" + $scope.sort.key);
		
		$scope.reviews.sort(function(a, b)
		{
			dateA=new Date(a.date);
			dateB=new Date(b.date);
			if ($scope.sort.key == 0)
			{
				return dateA-dateB;
			}
			return dateB-dateA;
		});
		$scope.reviewShow(0);
	};
		
	$scope.reviewShow(0);
});
