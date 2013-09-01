﻿app.controller('admin.projects.list', ['$scope', '$http', 'total', 'logger', '$location', 'consts', 'dialogs', 'customGrid',
function ($scope, $http, total, logger, $location, consts, dialogs, customGrid) {
    customGrid.build(
        {
            $scope: $scope,
            total: total,
            pageDataUrl: 'api/Admin/Projects/Page',
            onSetPagingData: function (data) {
                $scope.project = undefined;
            },
            afterSelectionChange: function (rowItem, event) {
                $scope.project = rowItem.entity;
            },
            columnDefs:
                [
                    { button: { onClick: 'remove', icon: 'trash' }, width: 40 },
                    { button: { onClick: 'view', icon: 'eye-open' }, width: 40 },
                    { button: { onClick: 'edit', icon: 'edit' }, width: 40 },
                    { field: 'title', displayName: 'Название' },
                    { field: 'masterName', displayName: 'Мастер' },
                    { comment: true }
                ]
        }
    );

    $scope.remove = function (row) {
        dialogs.confirmDelete(function () {
            var project = row ? row.entity : $scope.project;
            $http.delete('api/Admin/Projects/' + project.id)
                .success(function (data) {
                    delete project;
                    $scope.totalServerItems--;
                    $scope.refreshGrid();
                })
                .error(function (data) {
                    logger.error('delete error: ' + data.message);
                });
        });
    }

    $scope.new = function () {
        $location.path('/admin/projects/new');
    }

    $scope.view = function (row) {
        var projectId = row ? row.entity.id : $scope.project.id;
        $location.path('/admin/projects/view/' + projectId);
    }

    $scope.edit = function (row) {
        var projectId = row ? row.entity.id : $scope.project.id;
        $location.path('/admin/projects/edit/' + projectId);
    }
}]);

app.controller('admin.projects.view',
    ['$scope', 'project', '$location',
    function ($scope, project, $location) {        
        $scope.project = project;
        $scope.edit = function () {
            $location.path('/admin/projects/edit/' + $scope.project.id);
        }
    }]);

app.controller('admin.projects.edit', ['$scope', 'project', '$location', '$http', 'dialogs', 'masters', 'logger',
    function ($scope, project, $location, $http, dialogs, masters, logger) {
        $scope.project = project;
        $scope.masters = masters;
        for (var i = 0, len = masters.length; i < len; i++) {
            if (masters[i].value == project.master) {
                $scope.selectedMaster = masters[i];
                break;
            }
        }

        $scope.$watch('selectedMaster', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.project.master = $scope.selectedMaster.value;
            }
        }, true);

        $scope.save = function () {
            $scope.project.$save(function (project) {
                $location.path('/admin/projects/view/' + project.id);
            }, function (error) {
                logger.error(error.data.message);
            });
        }

        $scope.remove = function () {
            dialogs.confirmDelete(function () {
                $http.delete('api/Admin/Projects/' + $scope.project.id)
                    .success(function (data) {
                        delete $scope.project;
                        $location.path('/admin/projects/');
                    })
                    .error(function (data) {
                        logger.error('delete error: ' + data.message);
                    });
            });
        };
    }]);

app.controller('admin.projects.new', ['$scope', 'Project', '$location', 'masters', 'logger',
    function ($scope, Project, $location, masters, logger) {
        $scope.project = new Project();
        masters.splice(0, 0, { value: null, display: '' });
        $scope.masters = masters;
        $scope.selectedMaster = masters[0];

        $scope.$watch('selectedMaster', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.project.master = $scope.selectedMaster.value;
            }
        }, true);

        $scope.save = function () {
            $scope.project.$save(function (project) {
                $location.path('/admin/projects/view/' + project.id);
            }, function (error) {
                logger.error(error.data.message);                
            });
        }
    }]);