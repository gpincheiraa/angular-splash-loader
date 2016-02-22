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
  function isBoolean(arg){
    return Object.prototype.toString.call(arg) === '[object Boolean]';
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
                        <h1 id="loading-msg">{{vm.message}}</h1>\
                      </section>\
                  </div>';
    $templateCache.put('loadSplash.html', template);
  }
  
  //PROVIDER
  angular
    .module('ngSplashLoader')
    .provider('SplashLoader', Provider);

  function Provider(){
    var _messages = ['Earth provides enough to satisfy every man\'s needs, but not every man\'s greed.',
                     'What you take from the earth, you must give back. That\'s nature\'s way.',
                     'Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts',
                     'What makes earth feel like hell is our expectation that it should feel like heaven.'],
        _typingSpeed = 100,
        _logo = 'https://pixabay.com/static/uploads/photo/2014/04/03/10/33/earth-310882_960_720.png',
        _disableTyping = false,
        _messagesInterval = 5000;
    
    getter.$inject = ['$document','$compile','$rootScope'];
    
    this.setMessages = setMessages;
    this.setLogoSrc = setLogo;
    this.setTypingSpeed = setTypingSpeed;
    this.setDisableTyping = setDisableTyping;
    this.setMessagesInterval = setMessagesInterval;

    this.$get = getter;
    
    //Getter
    getter.$inject = ['$document','$compile','$rootScope'];
    function getter($document,$compile,$rootScope){
      var element = angular.element('<gp-splash-loader></gp-splash-loader>');
      //Class
      function SplashLoader(){
        this.messages = _messages;
        this.logoSrc = _logo;
        this.typingSpeed = _typingSpeed;
        this.disableTyping = _disableTyping;
        this.messagesInterval = _messagesInterval;
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
    function setLogo(logoSrc){
      _logo = logoSrc;
    }

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

    function setDisableTyping(option){
      try{
        if(!isBoolean(option)){
          throw 'SplashLoaderProvider: The given argument should be an Boolean value';
        }
        _disableTyping = option;
      }
      catch(err){
        console.error(err);
      }
    }

    function setMessagesInterval(value){
      try{
        if(!isNumber(value)){
          throw 'SplashLoaderProvider: The given argument should be an Number';
        }
        _messagesInterval = value;
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
  
  directive.$inject = ['$timeout', '$compile'];
  
  function directive($timeout, $compile){
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
      
      if(ctrl.disableTyping){
        element.addClass('no-typing');
      }

      $timeout(init,500);
      
      function init(){
        pos = 0;
        selectedMsg = ctrl.messages.length > 1  ? pickMsg()
                                                : ctrl.messages[0];
        ctrl.opened = true;
        ctrl.message = '';
        
        if(!ctrl.disableTyping) {
          letterType();
        }
        else{
          showMessage();
        }
        
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

      function showMessage(){
        ctrl.message = selectedMsg;
        if(ctrl.messages.length > 1)
          $timeout(init,ctrl.messagesInterval);
      }

      
      function letterType() {
        pos++;
        var typeLoop,
            currentMsg = ctrl.message,
            typingMsg = selectedMsg.slice(pos - 1, pos);

         ctrl.message = currentMsg + typingMsg;

        if (pos < selectedMsg.length) {
          typeLoop = $timeout(letterType, ctrl.typingSpeed);
        }
        else {
          $timeout.cancel(typeLoop);
          if(ctrl.messages.length > 1)
            $timeout(init,ctrl.messagesInterval);
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
    vm.messagesInterval = SplashLoader.messagesInterval;
    vm.typingSpeed = SplashLoader.typingSpeed;
    vm.disableTyping = SplashLoader.disableTyping;
  }
  // END OF DIRECTIVE
})(window,window.angular);