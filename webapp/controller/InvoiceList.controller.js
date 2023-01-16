sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], function (Controller, MessageToast, JSONModel, Filter) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

        onInit: function () {
            // set data model on view
            var oModel = new JSONModel("https://jsonplaceholder.typicode.com/todos");
            this.getView().setModel(oModel, "invoice");
        },

        onShowDetail: function (oEvent) {
            var oSelectedInvoice = oEvent.getSource().getBindingContext("invoice").getObject();
            var sInvoice = JSON.stringify(oSelectedInvoice, null, 4);
            window.open("data:text/json;charset=utf-8," + encodeURIComponent(sInvoice), "_blank", "width=600, height=600");
        },

        onSearch: function (oEvent) {
            // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("title", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }

            // update list binding
            var list = this.byId("invoiceList");
            var binding = list.getBinding("items");
            binding.filter(aFilters, "Application");
        },

        onPressDetails: function (oEvent) {
            // get the binding context of the clicked object
            var oBindingContext = oEvent.getSource().getBindingContext("invoice");
            // get the object from the binding context
            var oObject = oBindingContext.getObject();
            // open a new tab with the object details
            window.open("https://jsonplaceholder.typicode.com/todos/" + oObject.id);
        }
    });
});
