/* eslint-disable object-shorthand */
//
sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'],
  (Controller, JSONModel, MessageToast) => {
    return Controller.extend('ui5boilerplate.controller.CreateMembership', {
      /*  OnInit - lifecycle function
       */
      onInit() {
        const membership = { membership: [] };
        /* Create JSON Model
         */
        var OModelCourse = new JSONModel();
        var OModelMember = new JSONModel();
        /* Load JSON file data in synchronous mode
         */
        OModelCourse.loadData('/model/bachelor_courses.json', false);
        /* named model binding, useful when we have multiple model in the same view
         */
        this.getView().setModel(OModelCourse, 'courseModel');
        /* JSON model for membership
         */
        OModelMember.setData(membership);
        // this.getView().setModel(OModelMember, 'membership');
        sap.ui.getCore().setModel(OModelMember, 'membership');
        this.setMaxDobDate();
      },

      /**
       * Set maxDate for DatePicker control
       * @function
       */
      setMaxDobDate() {
        const dob_picker = this.getView().byId('dob_picker');
        const max_date = new Date();
        dob_picker.setMaxDate(max_date);
      },

      /**
       * Validate and save membership data to JSON Model
       * @function
       */
      saveMembership() {
        const studentId = this.getInputValue('student_id');
        const name = this.getInputValue('name');
        const date_of_birth = this.getInputValue('dob_picker');
        const mail_id = this.getInputValue('email');
        const resident_type = this.getRadioButtonValue('resident_type');
        const interest = this.getInterest();
        const course = this.getComboBoxValue('course');
        const membership = {
          studentId: studentId,
          name: name,
          dateOfBirth: date_of_birth,
          mailId: mail_id,
          residentType: resident_type,
          interest: interest,
          course: course,
        };
        const membershipObj = sap.ui.getCore().getModel('membership').getData();
        if (!this.validateMembership(membershipObj.membership, studentId)) {
          membershipObj.membership.push(membership);
          sap.ui
            .getCore()
            .getModel('membership')
            .setProperty('/membership', membershipObj.membership);
          MessageToast.show('Membership created successfully!', {
            duration: 2000,
          });
        } else {
          MessageToast.show('Error creating membership!', {
            duration: 2000,
          });
        }
      },

      /**
       * Get input value for control which have getValue method
       * optional chaining to handle access error
       * @function
       * @param {string} id ID of the control
       * @return {string} control input value
       */
      getInputValue(id) {
        return this.getView().byId(id).getValue?.();
      },

      /**
       * Get selected RadioButton control text
       * @function
       * @param {string} id ID of the control
       * @return {string} Selected radio button text
       */
      getRadioButtonValue(id) {
        return this.getView().byId(id).getSelectedButton().getText();
      },

      /**
       * Get array list of interest
       * @function
       * @return {string[]} Values from multiple CheckBox controls
       */
      getInterest() {
        let interest = [];
        if (this.getView().byId('interest_1').getSelected()) {
          interest.push('interest_1');
        }
        if (this.getView().byId('interest_2').getSelected()) {
          interest.push('interest_2');
        }
        return interest;
      },

      /**
       * Get selected value of the combo box control
       * @function
       * @param {string} id ID of the control
       * @return {string} selected value
       */
      getComboBoxValue(id) {
        return this.getView().byId(id).getSelectedItem().getText();
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
      /**
       * Navigation to the Home page view
       * @function
       */
      navToHomePage() {
        this.getOwnerComponent().getRouter().navTo('home');
      },
    });
  }
);
