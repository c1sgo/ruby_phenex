root.AppComponent || (root.AppComponent = {});
root.AppComponent.Functions = {
  // START JS METHOD
  initComponent: function () {
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
  },
  // END JS METHOD

  // START JS METHOD
  processHistory: function (token) {
    if (token) {
      this.loadComponent({name:token, container:'main-panel'});
    } else {
      Ext.getCmp('main-panel').removeChild();
    }
  },
  // END JS METHOD

  // START JS METHOD
  instantiateComponent: function (config) {
    this.findById('main-panel').instantiateChild(config);
  },
  // END JS METHOD

  // START JS METHOD
  appLoadComponent: function (name) {
    Ext.History.add(name);
  },
  // END JS METHOD

  // START JS METHOD
  loadComponentByAction: function (action) {
    this.appLoadComponent(action.component || action.name);
  },
  // END JS METHOD

  // START JS METHOD
  onToggleConfigMode: function (params) {
    this.toggleConfigMode();
  },
  // END JS METHOD

  // START JS METHOD
  showMasqueradeSelector: function () {
  },
  // END JS METHOD

  // START JS METHOD
  loadView: function (name) {
    var view =
      name.split('.').inject(root, function (module, str) {
        return ((module && module[str]) || null);
      });

    if (view) {
      alert('time to replace components with page components')
    } else {
      new Ajax.Request(
        name.slashify,
        { onSuccess: this.loadView
        },
      this);
    }
  },
  // END JS METHOD

  // START JS METHOD
  onClick: function (n) {
    alert(n.attributes.text.underscore());
    n.ownerTree.loadView(n.attributes.text.underscore());
  }
  // END JS METHOD
};