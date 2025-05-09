sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    return Controller.extend("com.walmart.walmart.user.poc.controller.Detail", {
      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        const sPath = decodeURIComponent(
          oEvent.getParameter("arguments").userPath
        );
        console.log(`Bindigng path: ${sPath}`);

        const oModel = this.getView().getModel();
        console.log("Model data:", oModel.getData());
        this.getView().bindElement(`/${sPath}`);
      },

      onSave: function () {
        MessageToast.show("User details saved!");
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("main");
      },

      onCancel: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("main");
      },
    });
  }
);
