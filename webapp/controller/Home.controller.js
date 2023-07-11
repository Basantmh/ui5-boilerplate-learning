/* eslint-disable object-shorthand */
//
sap.ui.define(
  ['sap/ui/core/mvc/Controller'],
  (Controller) => {
    return Controller.extend('ui5boilerplate.controller.Home', {
      /**
       * Navigation to Create Membership page
       * @function
      */
      navToCreateMembership() {
        this.getOwnerComponent().getRouter().navTo('createMembership');
      },
      /**
       * Navigation to View Membership Page
       * @function
       */
      navToViewMembership() {
        this.getOwnerComponent().getRouter().navTo('viewMembership');
      }
    });
  }
);
