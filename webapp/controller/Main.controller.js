sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, MessageToast) => {
    return Controller.extend("com.walmart.walmart.user.poc.controller.Main", {
      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("main")
          .attachPatternMatched(this._onRouteMatched, this);

        const oList = this.getView().byId("userTable");
        console.log("What is the list Id?", oList);

        // const oModel = this.getOwnerComponent().getModel();
        // this.getView().setModel(oModel);
        // console.log("Model Data in the Main view:", oModel.getData());
      },

      _onRouteMatched: function () {
        console.log("Main route matched. Refreshing list binding...");

        const oList = this.getView().byId("userTable");
        if (oList) {
          console.log("Rebinding the table...");
          oList.bindItems({
            path: "/users",
            template: oList.getBindingInfo("items").template,
          });
        } else {
          console.error(
            "List not found! Ensure the ID 'userTable' is correct."
          );
        }
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
