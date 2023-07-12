sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    '../model/LmsConstants',
    '../model/BachelorDegreeList',
    '../model/MembershipModel',
  ],
  (Controller, JSONModel, MessageToast, LmsConstants, BachelorDegreeList, MembershipModel) => {
    return Controller.extend('ui5boilerplate.controller.Home', {
      /*  OnInit - lifecycle function
       */
      onInit() {
        /* Create JSON Model and set Model
         */
        this.OModel = new JSONModel();
        this.i18nResourceBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
        this.getView().setModel(this.OModel, 'lmsDataModel');
        /* JSON model for membership
         */
        this.OModel.setProperty('/lmsConstants', LmsConstants);
        this.OModel.setProperty('/bachelorDegreeList', BachelorDegreeList);
        this.OModel.setProperty('/membership', []);
        this.OModel.setProperty('/membershipBuffer', MembershipModel.membershipBuffer);
      },
      /**
       * Validate and save membership data to JSON Model
       * @function
       */
      saveMembership() {
        const membershipArr = this.OModel.getProperty('/membership');
        const membershipBuffer = this.OModel.getProperty('/membershipBuffer');
        if (
          !this.validateMembership(membershipArr, membershipBuffer.studentId) &&
          membershipBuffer.studentId !== ''
        ) {
          membershipArr.push(membershipBuffer);
          this.OModel.setProperty('/membership', membershipArr);
          MessageToast.show(this.i18nResourceBundle.getText('MEMBER_CREATED_SUCCESS'));
        } else {
          MessageToast.show(this.i18nResourceBundle.getText('MEMBER_CREATED_ERROR'));
        }
      },
      /**
       * Check if studentId already exist in the JSON Model
       * @function
       * @param {string[]} membershipArr Array containing membership JSON data
       * @param {string} studentId studentId provided by the user for validation
       * @return {boolean} boolean state of validation
       */
      validateMembership(membershipArr, studentId) {
        return membershipArr.find((currentValue) => {
          return currentValue.studentId === studentId;
        });
      },
    });
  }
);
