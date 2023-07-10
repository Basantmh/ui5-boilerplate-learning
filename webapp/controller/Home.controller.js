//
sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'],
  (Controller, JSONModel) => {
    return Controller.extend('ui5boilerplate.controller.Home', {
      onInit() {
        const courseList = { CourseList: [{ course: 'B.Tech' }, { course: 'B.Com' }, { course: 'BCA' }] };
        var OModel = new JSONModel();
        OModel.setData(courseList);
        this.getView().setModel(OModel, 'CourseModel'); // named model binding, useful when we have multiple model in the same view
      }
    });
  }
);
