angular.module("app.todo")
    .controller("TodoController", function ($scope, localStorageService) {
        $scope.model = angular.fromJson(localStorageService.get("todoList"));
        if (!$scope.model) {
            // setup default list
            $scope.model = [
                {
                    name: "Primary", list: [
                        { taskName: "Create an Angular-js TodoList", isDone: false },
                        { taskName: "Understanding Angular-js Directives", isDone: true }
                    ]
                },
                {
                    name: "Secondary", list: [
                        { taskName: "Build an open-source website builder", isDone: false },
                        { taskName: "Build an Email Builder", isDone: false }
                    ]
                },
                {
                    name: "Tertiary", list: [
                        { taskName: "Publish to the web", isDone: false },
                        { taskName: "Submit to search engines", isDone: false }
                    ]
                }
            ];
        }
        $scope.show = "All";
        $scope.currentShow = 0;
        $scope.addTodo = function () {
            if (!$scope.newTodo) {
                return; // avoid accident add
            }
            /*Should prepend to array*/
            $scope.model[$scope.currentShow]
                .list.splice(0, 0, {
                    taskName: $scope.newTodo,
                    isDone: false
                });
            /*Reset the Field*/
            $scope.newTodo = "";
        };

        $scope.deleteTodo = function (item) {
            var index = $scope.model[$scope.currentShow].list.indexOf(item);
            $scope.model[$scope.currentShow].list.splice(index, 1);
        };

        $scope.todoSortable = {
            containment: "parent", //Don't let the user drag outside the parent
            cursor: "move", //Change the cursor icon on drag
            tolerance: "pointer" //Read http://api.jqueryui.com/sortable/#option-tolerance
        };

        $scope.changeTodo = function (i) {
            $scope.currentShow = i;
        };

        /* Filter Function for All | Incomplete | Complete */
        $scope.showFn = function (todo) {
            if ($scope.show === "All") {
                return true;
            } else if (todo.isDone && $scope.show === "Complete"){
                return true;
            } else if (!todo.isDone && $scope.show === "Incomplete"){
                return true;
            }
            return false;
        };

        $scope.$watch("model", function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                localStorageService.set("todoList", angular.toJson(newVal));
            }
        }, true);
});
