sap.ui.define(
  ["sap/ui/core/UIComponent", "com/walmart/walmart/user/poc/model/models", "sap/ui/model/json/JSONModel"],
  (UIComponent, models, JSONModel) => {
    return UIComponent.extend("com.walmart.walmart.user.poc.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init(...args) {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, args);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // Set the JSON model globally
        const oModel = new JSONModel();
        oModel.loadData("model/users.json"); // Load your users.json file
        oModel.setDefaultBindingMode("TwoWay"); // Set the default binding mode to TwoWay
        this.setModel(oModel); // Attach the model to the component

        // enable routing
        this.getRouter().initialize();
      },
    });
  }
);
