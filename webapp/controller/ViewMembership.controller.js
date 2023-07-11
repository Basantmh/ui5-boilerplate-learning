sap.ui.define(['sap/ui/core/mvc/Controller'], (Controller) => {
  return Controller.extend('ui5boilerplate.controller.ViewMembership', {
    /**
     * Navigate to home page
     * @function
     */
    onInit() {
      this.getView().setModel(sap.ui.getCore().getModel('membership'), 'membershipView');
    },
    navToHomePage() {
      this.getOwnerComponent().getRouter().navTo('home');
    },
  });
});
