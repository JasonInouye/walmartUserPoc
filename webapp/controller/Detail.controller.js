sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  (Controller, MessageToast, MessageBox) => {
    return Controller.extend("com.walmart.walmart.user.poc.controller.Detail", {
      _originalData: null,

      onInit: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this._onObjectMatched, this);

        this._attachChangeHandlers();
      },

      _onObjectMatched: function (oEvent) {
        const sPath = decodeURIComponent(
          oEvent.getParameter("arguments").userPath
        );

        const oModel = this.getView().getModel();
        this.getView().bindElement(`/${sPath}`);

        this._originalData = JSON.parse(
          JSON.stringify(oModel.getProperty(sPath))
        ); // Store the original data for comparison

        console.log("Original data stored:", this._originalData);

        this._setSaveEnabled(false); // Initially disable the save button
      },

      _isDirty: function () {
        const oModel = this.getView().getModel();
        const sPath = this.getView().getBindingContext().getPath();
        const oCurrentData = oModel.getProperty(sPath);
        // Compare the current data with the original data
        return (
          JSON.stringify(oCurrentData) !== JSON.stringify(this._originalData)
        );
      },

      _attachChangeHandlers: function () {
        const aInputFields = [
          "nameInput",
          "phoneInput",
          "emailInput",
          "carrierIdInput",
          "typeInput",
        ];

        for (const sId of aInputFields) {
          const oInput = this.byId(sId);
          if (oInput) {
            oInput.attachLiveChange(this._onFieldChanged.bind(this));
          } else {
            console.error(`Input field with ID ${sId} not found.`);
          }
        }
      },

      _onFieldChanged: function () {
        console.log("Field changed, checking dirty state...");
        const bDirty = this._isDirty();
        console.log("Is dirty?", bDirty);
        this._setSaveEnabled(bDirty);
      },

      _setSaveEnabled: function (bEnabled) {
        const oSaveBtn = this.byId("saveButton");
        if (oSaveBtn) {
          oSaveBtn.setEnabled(bEnabled);
        }
      },

      onNavBack: function () {
        if (this._isDirty()) {
          MessageBox.confirm("You have unsaved changes. Discard and go back?", {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.YES) {
                this._navToMain();
              }
            }.bind(this),
          });
        } else {
          this._navToMain();
        }
      },

      _navToMain: function () {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("main");
      },

      onSave: function () {
        const oModel = this.getView().getModel();
        const sPath = this.getView().getBindingContext().getPath();
        const oUpdatedData = oModel.getProperty(sPath);

        // Log the updated data to the console
        console.log("Updated data:", oUpdatedData);

        // Show a success message
        MessageToast.show("User details saved!");

        // Access the main view
        const oComponent = this.getOwnerComponent();
        const oMainView = oComponent.byId(
          "container-com.walmart.walmart.user.poc---Main"
        ); // Replace with your Main view ID
        const oList = oMainView.byId("userTable");

        oModel.refresh(true); // Refresh the model to ensure it has the latest data

        // Refresh the list binding in the main view
        // const oList = this.getView().byId("userTable");
        console.log("What is the list Id?", oList);
        if (oList) {
          console.log("Refreshing list binding...");
          oList.getBinding("items").refresh();
        } else {
          console.error(
            "List not found! Ensure the ID 'userTable' is correct."
          );
        }

        // Optional: Send the updated data to a backend service
        // Uncomment and implement the following if needed:
        /*
        $.ajax({
            url: "/your/backend/api",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(oUpdatedData),
            success: function () {
                MessageToast.show("Changes saved to the backend!");
            },
            error: function () {
                MessageToast.show("Failed to save changes.");
            }
        });
        */

        // Navigate back to the main view
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("main");
      },
    });
  }
);
