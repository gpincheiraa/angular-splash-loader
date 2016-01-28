//////////////////////// EXAMPLE APP ////////////////////////////////////
(function(){
  'use strict';
  
  //config
  angular
    .module('ExampleApp',['ngSplashLoader'])
    .config(configFn);

  configFn.$inject = ['SplashLoaderProvider'];

  function configFn(SplashLoaderProvider){
    SplashLoaderProvider.setMessages(['Estamos buscando la información', 'Si usas iOs ten paciencia']);
  }

  //controller
  angular
    .module('ExampleApp')
    .controller('ExampleController', Controller);

  Controller.$inject = ['$timeout','SplashLoader'];

  function Controller($timeout,SplashLoader){
    var vm = this;
    vm.secondsToWaiting = 1000;
    vm.getTooMuchData = getData;
  
    
    function getData(){
      SplashLoader.open();
      //Simulate a large waiting for data
      $timeout(function(){
        SplashLoader.close();
      },vm.secondsToWaiting*1000);
    }

  }

})();