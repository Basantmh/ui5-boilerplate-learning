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
        var OModel = new JSONModel();
        this.getView().setModel(OModel, 'lmsDataModel');
        /* JSON model for membership
         */
        OModel.setProperty('/lmsConstants', LmsConstants);
        OModel.setProperty('/bachelorDegreeList', BachelorDegreeList);
        OModel.setProperty('/membership', []);
        OModel.setProperty('/membershipBuffer', MembershipModel.membershipBuffer);
      },
      /**
       * Validate and save membership data to JSON Model
       * @function
       */
      saveMembership() {
        const OModel = this.getView().getModel('lmsDataModel');
        const membershipArr = OModel.getProperty('/membership');
        const membershipBuffer = OModel.getProperty('/membershipBuffer');
        if (
          !this.validateMembership(membershipArr, membershipBuffer.studentId) &&
          membershipBuffer.studentId !== ''
        ) {
          membershipArr.push(membershipBuffer);
          OModel.setProperty('/membership', membershipArr);
          MessageToast.show('Membership created successfully!');
        } else {
          MessageToast.show('Error creating membership!');
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
