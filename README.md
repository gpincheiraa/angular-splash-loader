#Angular Splash Loader

A pretty loader that shows a configurable messages while a certain logo uses a spin effect.

#Getting Started

`bower install angular-splash-loader`


Include css and js in your index.html

* src/css/angular-splash-loader.css
* src/js/angular-splash-loader.js


#Usage

Add the module `ngSplashLoader` in you main module app

```javascript
  angular
    .module('your_module', ['ngSplashLoader']);
  
```

Use it in your controller injecting `SplashLoader` service.

```javascript
  angular
    .module('your_module')
    .controller(['SplashLoader', function(SplashLoader){
      
        //Open the splash loader
        SplashLoader.open();


        //Close the splash loader
        SplashLoader.close();
    
    }]);
```

If you want, you can configure some options of splash loader injecting the `SplashLoaderProvider`.

```javascript
  angular
    .module('your_module')
    .config(['SplashLoaderProvider', function(SplashLoaderProvider){
        
        //Set messages to be displayed.
        var arrayWithMessages = ['Listen Jazz it\'s good for your brain and your spirit.',
                                 'Imagination will often carry us to worlds that never were. But without it we go nowhere. '];

        SplashLoaderProvider.setMessages(arrayWithMessages);

        //Set the logo url
        SplashLoaderProvider.setLogoSrc('http://your_url_logo.png');
        
        //Set the speed of the phrase typying (in milliseconds)
        SplashLoaderProvider.setTypingSpeed(2000);
        
        //Disable the typing mode
        SplashLoaderProvider.setDisableTyping(true);

        //Set the interval of the messages appears (in milliseconds)
        SplashLoaderProvider.setMessagesInterval(5000);

    }]);
```


  
#Roadmap

0.0.1 
  - Basic functionality of splashLoader

0.0.2 

  - Add gruntfile for development
  - Add more options for modify the behaviour of the css

0.0.3
  
  - Add testing
  - Add template option
