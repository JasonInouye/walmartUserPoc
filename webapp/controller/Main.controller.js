sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, MessageToast) => {
    return Controller.extend("com.walmart.walmart.user.poc.controller.Main", {
      onInit: function () {
        const oModel = new JSONModel();
        oModel.loadData("model/users.json");
        this.getView().setModel(oModel);
      },

      onEditUser: function (oEvent) {
        const oItem = oEvent.getSource().getParent();
        const oContext = oItem.getBindingContext();
        const sPath = oContext.getPath().substr(1);

        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("detail", {
          userPath: encodeURIComponent(sPath),
        });
      },
    });
  }
);
