sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {

    return Controller.extend("com.walmart.walmart.user.poc.controller.Main", {
    onInit: function() {
      const oModel = new JSONModel();
      oModel.loadData("model/users.json");
      this.getView().setModel(oModel);
    }
    });
});