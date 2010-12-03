function AppComponent () {
  js_method('init_component') = function() {
    RUBY['js_full_class_name'].superclass.initComponent.call(this);

    // If we are given a token, load the corresponding component, otherwise load the last loaded component
    var currentToken = Ext.History.getToken();
    if (currentToken != "") {
      this.processHistory(currentToken);
    } else {
      var lastLoaded = this.initialConfig.componentToLoad; // passed from the server
      if (lastLoaded) Ext.History.add(lastLoaded);
    }

    Ext.History.on('change', this.processHistory, this);

    // Setting the "busy" indicator for Ajax requests
    Ext.Ajax.on('beforerequest', function(){this.findById('main-statusbar').showBusy()}, this);
    Ext.Ajax.on('requestcomplete', function(){this.findById('main-statusbar').hideBusy()}, this);
    Ext.Ajax.on('requestexception', function(){this.findById('main-statusbar').hideBusy()}, this);

    // Initialize history
    Ext.History.init();
  }

  js_method('on_login') = function () {
    window.location = "RUBY['login_url']"
  }

  js_method('on_logout') = function () {
    window.location = "RUBY['logout_url']"
  }

  js_method('process_history') = function (token) {
    if (token) {
      this.loadComponent({name:token, container:'main-panel'});
    } else {
      Ext.getCmp('main-panel').removeChild();
    }
  }

  js_method('instantiate_component') = function (config) {
    this.findById('main-panel').instantiateChild(config);
  }

  js_method('app_load_component') = function (name) {
    Ext.History.add(name);
  }

  js_method('load_component_by_action') = function (action) {
    this.appLoadComponent(action.component || action.name);
  }

  js_method('on_toggle_config_mode') = function (params) {
    this.toggleConfigMode();
  }

  js_method('show_masquerade_selector') = function () {
  }
}