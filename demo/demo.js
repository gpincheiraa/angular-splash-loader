//////////////////////// EXAMPLE APP ////////////////////////////////////
(function(){
  'use strict';
  
  //config
  angular
    .module('ExampleApp',['ngSplashLoader'])
    .config(configFn);

  configFn.$inject = ['SplashLoaderProvider'];

  function configFn(SplashLoaderProvider){
    // SplashLoaderProvider
    //   .setMessages(['Loading a lot of information, please keep calm. Enjoy this lecture',
    //                 'If you view this through an mobile device and your connection is slow, wait a while.']);
    
    //SplashLoaderProvider.setLogoSrc('https://dinex.cl/webapp/img/dinex-icon-color-alpha-shadow.svg');
    SplashLoaderProvider.setMessagesInterval(6000);
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