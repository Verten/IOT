/**
 * Created by ebinhon on 6/2/2016.
 */

'use strict';
angular.module('iotApp.resourceController', [])
    .controller('resourceController', [
        '$rootScope',
        '$scope',
        '$http',
        '$timeout',
        '$log',
        function ($rootScope, $scope, $http, $timeout, $log) {
            $log.info('call iotApp.resourceController...');

            //declare $scope parameter
            var _device_detail = {};
            var _device_list = [];
            var _all_list = [];
            var _tmp_device_list = [];
            var _deviceType = [];
            var _device;
            var showElement = false;
            //end

            //new $http to getting data from interface, local development using json file,
            // production should change to interface
            var request = {
                method: 'GET',
                url: 'json/device.json',
                header: {
                    'Content-Type': 'json'
                }
            };
            $http(request).then(function (successResponse) {
                $log.info('getting Device List Successfully.');
                $log.debug(successResponse);
                _device_list = successResponse.data;
                angular.forEach(_device_list, function (value, key) {
                    value.tmpType = 'device';
                });
                _device = successResponse.data;
                //get device Type for each device
                // production should change to interface
                request = {
                    method: 'GET',
                    url: 'json/deviceType.json',
                    header: {
                        'Content-Type': 'json'
                    }
                };
                $http(request).then(function (successResponse) {
                    $log.info('getting Device Type List Successfully.');
                    $log.debug(successResponse);
                    _deviceType = successResponse.data;
                    angular.forEach(_deviceType, function (value, key) {
                        value.tmpType = 'devicetype'
                    });
                    $scope._deviceType = _deviceType;
                }, function (FailedResponse) {
                    $log.error('getting Device Type List Failed.');
                    $log.error(FailedResponse);
                });
                //
                var paginationData = pagination(_device_list, 1);
                $scope._device_list = paginationData.data;
                _device_detail = paginationData.data[0];
                $scope._device_detail = _device_detail;
                $scope._device = _device;
            }, function (FailedResponse) {
                $log.error('getting Device List Failed.');
                $log.error(FailedResponse);
            });
            //

            var changeDeviceDetail = function (device) {
                angular.element('.elLayouts-Wrapper').addClass('elLayouts-Wrapper-showInfo');
                angular.element('.elLayouts-deviceInfo').addClass('elLayouts-deviceInfo-show');

                angular.forEach(_deviceType, function (value, key) {
                    if(value.id == device.type){
                        device.typeDetail = value;
                    }
                });
                $log.debug(device);
                $scope._device_detail = device;
            };

            var selectDevice = function ($event,type) {
                $log.debug(type);
                $event.stopPropagation();
                angular.forEach($scope._device_list, function (value, key) {
                    if (!showElement) {
                        if (value.checked) {
                            showElement = true;
                        } else {
                            showElement = false;
                        }
                    }
                });
                $scope.showElement = showElement;
                showElement = !showElement;
            };

            var removeDevice = function () {
                for(var index = _device_list.length; index--; index >= 0){
                    var _device = _device_list[index];
                    if (_device.checked) {
                        var _device_id = '';
                        if(_device.tmpType == 'device'){
                            _device_id = _device.id;
                        }else if(_device.tmpType == 'devicetype'){
                            _device_id = _device.typeDetail.id;
                            angular.forEach(_deviceType, function (value, key) {
                                if(value.id == _device_id){
                                    _deviceType.splice(key, 1);
                                }
                            });
                        }
                        //send $http request to remove this device
                        var request = {
                            method: 'GET',
                            url: 'remove Device or Device Type Interface',
                            header: {
                                'Content-Type': 'json'
                            },
                            data: _device_id
                        };
                        //$http(request).then(function(successResponse){
                        //    $log.info('removing device Successfully.');
                        //    $log.debug(successResponse);
                        //},function(FailedResponse){
                        //    $log.error('removing device Failed.');
                        //    $log.error(FailedResponse);
                        //});
                        //
                        _device_list.splice(index , 1);
                    }
                }

                var paginationData = pagination(_device_list, $scope.paginationObject.current_page,$scope.paginationObject.max_per_page_item);
                var _newList = paginationData.data;
                $scope._device_list = _newList;
                _device_detail = _newList[0];
                $scope._device_detail = _device_detail;
                $scope.showElement = false;
            };

            var pagination = function (list, pageIndex, max_per_page_item) {
                //Pagination
                var current_page;
                var current_item_index = 0;
                var max_per_page_item = angular.isDefined(max_per_page_item)? max_per_page_item : 5;
                var max_page;
                var pageList = [];
                var _new_list = [];
                max_page = Math.floor(list.length / max_per_page_item);
                if (list.length % max_per_page_item != 0) {
                    max_page++;
                }
                if (pageIndex >= max_page) {
                    pageIndex = max_page;
                }
                if (pageIndex <= 0) {
                    pageIndex = 1;
                }
                if (pageIndex == 1) {
                    current_item_index = 0;
                } else {
                    current_item_index = (pageIndex - 1) * max_per_page_item;
                }
                angular.forEach(list, function (value, key) {
                    if (key >= current_item_index && key < (current_item_index + max_per_page_item)) {
                        _new_list.push(value);
                    }
                });
                current_page = pageIndex;
                for (var i = 1; i <= max_page; i++) {
                    pageList.push(i);
                }
                var paginationObject = {
                    current_page: current_page,
                    data: _new_list,
                    max_per_page_item: max_per_page_item,
                    max_page: max_page,
                    pageList: pageList
                };
                $scope.paginationObject = paginationObject;
                $log.debug(paginationObject);
                return paginationObject;
            };

            var changePage = function (pageIndex,max_per_page_item) {
                var paginationData = pagination(_device_list, pageIndex, max_per_page_item);
                var _newList = paginationData.data;
                $scope._device_list = _newList;
                _device_detail = _newList[0];
                $scope._device_detail = _device_detail;
            };

            var showAllList = function () {
                if(_all_list.length != 0){
                    return false;
                }
                _all_list = [];
                _tmp_device_list = _device_list;
                angular.forEach(_device_list, function (value, key) {
                    _all_list.push(value);
                });
                angular.forEach(_deviceType, function (value, key) {
                    var deviceType = {
                        name: value.name,
                        type: 'Device Type',
                        tmpType: value.tmpType,
                        typeDetail: value
                    }
                    _all_list.push(deviceType);
                });
                _device_list = _all_list;
                var paginationData = pagination(_device_list, 1, 5);
                var _newList = paginationData.data;
                $scope._device_list = _newList;
                _device_detail = _newList[0];
                $scope._device_detail = _device_detail;
            };

            var showDeviceList = function(max_per_page_item){
                if(_tmp_device_list.length != 0){
                    _device_list = _tmp_device_list;
                }else{

                }
                var paginationData = pagination(_device_list, 1, max_per_page_item);
                var _newList = paginationData.data;
                $scope._device_list = _newList;
                _device_detail = _newList[0];
                $scope._device_detail = _device_detail;
            };

            var showDeviceTypeList = function(max_per_page_item){
                _tmp_device_list = _device_list;
                _device_list = [];
                angular.forEach(_deviceType, function (value, key) {
                    var deviceType = {
                        name: value.name,
                        type: 'Device Type',
                        tmpType: value.tmpType,
                        typeDetail: value
                    }
                    _device_list.push(deviceType);
                });
                var paginationData = pagination(_device_list, 1, max_per_page_item);
                var _newList = paginationData.data;
                $scope._device_list = _newList;
                _device_detail = _newList[0];
                $scope._device_detail = _device_detail;
            };

            //setting parameter to $scope
            $scope._device_list = _device_list;
            $scope._device_detail = _device_detail;
            $scope.changeDeviceDetail = changeDeviceDetail;
            $scope.removeDevice = removeDevice;
            $scope.showElement = showElement;
            $scope.selectDevice = selectDevice;
            $scope.pagination = pagination;
            $scope.changePage = changePage;
            $scope.showAllList = showAllList;
            $scope.showDeviceList = showDeviceList;
            $scope.showDeviceTypeList = showDeviceTypeList;
            //
        }
    ]);
