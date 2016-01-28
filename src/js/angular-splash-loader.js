////////////////////////////// DIRECTIVE //////////////////////////////
(function(window,angular,undefined){
  'use strict';
  
  //Helpers
  function isArray(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  function isNumber(arg){
    return Object.prototype.toString.call(arg) === '[object Number]';
  }
  //Definition of module and run function
  angular
    .module('ngSplashLoader',[])
    .run(runFn);
  
  runFn.$inject = ['$templateCache'];
  
  function runFn($templateCache){
    var template = '<div id="splash-overlay" ng-class="{\'opened\': vm.opened, \'closed\': !vm.opened}"></div>\
                    <div id="page-wrap" ng-class="{\'opened\': vm.opened, \'closed\': !vm.opened}">\
                      <section id="loader-wrap">\
                        <div id="logo-wrap">\
                          <img id="logo"\
                           src="{{vm.logo}}"/></div>\
                          <div id="spinner"></div>\
                      </section>\
                      <section id="message-wrap">\
                        <div id="header-wrap">\
                          <h1 id="loading-msg">{{vm.message}}</h1>\
                        </div>\
                      </section>\
                  </div>';
    $templateCache.put('loadSplash.html', template);
  }
  
  //PROVIDER
  angular
    .module('ngSplashLoader')
    .provider('SplashLoader', Provider);

  function Provider(){
    var _messages = ['Message 1', 'Message 2'],
        _typingSpeed = 100,
        _logo = 'https://dinex.cl/webapp/img/dinex-icon-color-alpha-shadow.svg';
    
    getter.$inject = ['$document','$compile','$rootScope'];
    
    this.setMessages = setMessages;
    this.setLogoSrc = setLogo;
    this.setTypingSpeed = setTypingSpeed;
    this.$get = getter;
    
    //Getter
    getter.$inject = ['$document','$compile','$rootScope'];
    function getter($document,$compile,$rootScope){
      var element = angular.element('<gp-splash-loader></gp-splash-loader>');
      //Class
      function SplashLoader(){
        this.messages = _messages;
        this.logoSrc = _logo;
      }
      
      SplashLoader.prototype.open = function(){
        $document.find('body').eq(0).append($compile(element)($rootScope));
      };
      SplashLoader.prototype.close = function(){
        element.remove();
      };
      
      return new SplashLoader();
    }
    
    //Setters
    function setMessages(messages){
      try{
        if(!isArray(messages)){
          throw 'SplashLoaderProvider: The given argument should be an Array';
        }
        _messages = messages;
      }
      catch(err){
        console.error(err);
      }
    }
    
    function setLogo(logoSrc){
      _logo = logoSrc;
    }
    
    function setTypingSpeed(speed){
      try{
        if(!isNumber(speed)){
          throw 'SplashLoaderProvider: The given argument should be an Number';
        }
        _typingSpeed = speed;
      }
      catch(err){
        console.error(err);
      }
    }
    
  }
  //END OF PROVIDER
  
  //DIRECTIVE
  angular
    .module('ngSplashLoader')
    .directive('gpSplashLoader', directive);
  
  directive.$inject = ['$timeout'];
  
  function directive($timeout ){
    var ddo = {
      restrict: 'E',
      link: linkFn,
      templateUrl:'loadSplash.html',
      bindToController: true,
      controllerAs: 'vm',
      controller: SplashControllerFn
    };
    return ddo;
    //Implementation of directive
    function linkFn(scope, element, attrs, ctrl){
      var pos,
          selectedMsg,
          lastMessageIndex;
      
      $timeout(init,500);
      
      function init(){
        pos = 0;
        selectedMsg = pickMsg();
        ctrl.opened = true;
        ctrl.message = '';
        letterType();
      }
      function getRandomIndex(){
        return Math.floor(Math.random() * (ctrl.messages.length));
      }
      function pickMsg() {
        var newIndex = getRandomIndex();
        while(newIndex === lastMessageIndex){
          newIndex = getRandomIndex();
        }
        lastMessageIndex = newIndex;
        return ctrl.messages[newIndex];
      }
      
      function letterType() {
        pos++;
        var typeLoop,
            currentMsg = ctrl.message,
            typingMsg = selectedMsg.slice(pos - 1, pos);

         ctrl.message = currentMsg + typingMsg;

        if (pos < selectedMsg.length) {
          typeLoop = $timeout(letterType, 100);
        } 
        else {
          $timeout.cancel(typeLoop);
          $timeout(init,5000);
        }
      }

    }
  }
  
  SplashControllerFn.$inject = ['SplashLoader'];
  
  function SplashControllerFn(SplashLoader){
    var vm = this;
    vm.opened = false;
    vm.logo = SplashLoader.logoSrc;
    vm.messages = SplashLoader.messages;
  }
  // END OF DIRECTIVE
})(window,window.angular);