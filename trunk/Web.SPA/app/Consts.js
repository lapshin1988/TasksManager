﻿app.constant('consts', {
    pageSize: 20,
    pageSizes: [20, 50, 100],
    messageBoxTemplate: '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">\n' +
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                '	<h3>{{ title }}</h3>\n' +
                                '</div>\n' +
                                '<div class="modal-body">\n' +
                                '	<p>{{ message }}</p>\n' +
                                '</div>\n' +
                                '<div class="modal-footer">\n' +
                                '	<button ng-repeat="btn in buttons" ng-click="close(btn.result)" type="button" class="btn btn-default" ng-class="btn.cssClass" data-dismiss="modal">{{ btn.label }}</button>\n' +
                                '</div>\n' +
                            '</div>' +
                        '</div>',
    customDialogTemplate: '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">\n' +
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                                '	<h3>{{ title }}</h3>\n' +
                                '</div>\n' +
                                '<div class="modal-body" ng-bind-html-unsafe="content">\n' +
                                '</div>\n' +
                                '<div class="alert alert-danger modal-dialog-alert" ng-show=error>{{error}}</div>\n' +
                                '<div class="alert alert-success modal-dialog-alert" ng-show=success>{{success}}</div>\n' +
                                '<div class="modal-footer">\n' +
                                '	<button ng-repeat="btn in buttons" ng-click="click(btn)" type="button" class="btn btn-default" ng-class="btn.cssClass">{{ btn.label }}</button>\n' +
                                '</div>\n' +
                            '</div>' +
                        '</div>',
    projectPriorityHigh: 0,
    projectPriorityMiddle: 1,
    projectPriorityLow: 2,
    projectPriority: {
        0: { translation: 'Высокий' },
        1: { translation: 'Средний' },
        2: { translation: 'Низкий' }
    },
    taskPriority: {
        0: { translation: 'Высокий' },
        1: { translation: 'Средний' },
        2: { translation: 'Низкий' }
    },
    taskType: {
        0: { translation: 'Новый' },
        1: { translation: 'Улучшение' },
        2: { translation: 'Ошибка' },
        3: { translation: 'Рефактор' }
    }
});