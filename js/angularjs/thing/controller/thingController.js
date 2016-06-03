/**
 * Created by ebinhon on 6/3/2016.
 */

'use strict';
angular.module('iotApp.thingController', [])
    .controller('thingController', [
        '$rootScope',
        '$scope',
        '$http',
        '$timeout',
        '$log',
        function ($rootScope, $scope, $http, $timeout, $log) {
            $log.info('call iotApp.thingController...');
            var _deviceType = {};
            var _device = {};
            var _deviceType_list = [];
            var _device_list = [];
            var showAttributeInfoFlag = false;
            var showDeviceTypeAttributeInfoFlag = false;
            var attribute_info = [
                {
                    name: '',
                    type: 'String',
                    unit: ''
                }
            ];

            //load _deviceType_list from interface
            var request = {
                method: 'GET',
                url: 'json/deviceType.json',
                header: {
                    'Content-Type': 'json'
                }
            };
            $http(request).then(function (successResponse) {
                $log.info('getting Device Type List Successfully.');
                $log.debug(successResponse);
                _deviceType_list = successResponse.data;
                $scope._deviceType_list = _deviceType_list;
            }, function (FailedResponse) {
                $log.error('getting Device Type List Failed.');
                $log.error(FailedResponse);
            });


            var saveDeviceType = function () {
                if(angular.isDefined($scope._deviceType)){
                    _deviceType = $scope._deviceType;
                    _deviceType.attributes = attribute_info;
                }
                $log.debug(_deviceType);
                //send post request to save device type
                //todo
                request = {
                    method: 'POST',
                    url: 'add Device Type Interface',
                    header: {
                        'Content-Type': 'json'
                    },
                    data: _deviceType
                };
                //$http(request).then(function(successResponse){
                //    $log.info('removing device Successfully.');
                //    $log.debug(successResponse);
                //},function(FailedResponse){
                //    $log.error('removing device Failed.');
                //    $log.error(FailedResponse);
                //});
                //
                //then load _deviceType_list again
                //todo
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
                    _deviceType_list = successResponse.data;
                    $scope._deviceType_list = _deviceType_list;
                }, function (FailedResponse) {
                    $log.error('getting Device Type List Failed.');
                    $log.error(FailedResponse);
                });


            };

            var saveDevice = function(){
                $log.debug($scope._device);
                //save device to interface
                //todo

            }

            var showAttributeInfo = function () {
                showAttributeInfoFlag = true;

                $scope.showAttributeInfoFlag = showAttributeInfoFlag;
            };

            var addAttribute = function () {
                attribute_info.push({
                    name: '',
                    type: 'String',
                    unit: ''
                });

                $scope.attribute_info = attribute_info;
            };

            var changeTypeForAttribute = function(attr, type){
                attr.type = type;
                //change the select view correctly
            };

            var changeTypeForDevice = function(device,type){
                device.type = type.id;
                device.typeName = type.name;
                device.typeDetail = type;
                showDeviceTypeAttributeInfoFlag = true;
                $scope.showDeviceTypeAttributeInfoFlag = showDeviceTypeAttributeInfoFlag;
            };

            var deleteAttribute = function (name) {
                angular.forEach(attribute_info, function (value, key) {
                    if(value.name == name){
                        attribute_info.splice(key, 1);
                    }
                });
            };

            //
            $scope._device = _device;
            $scope.showAttributeInfoFlag = showAttributeInfoFlag;
            $scope.attribute_info = attribute_info;

            $scope._deviceType_list = _deviceType_list;

            $scope.saveDeviceType = saveDeviceType;
            $scope.saveDevice = saveDevice;
            $scope.showAttributeInfo = showAttributeInfo;
            $scope.changeTypeForAttribute = changeTypeForAttribute;
            $scope.changeTypeForDevice = changeTypeForDevice;

            $scope.addAttribute = addAttribute;
            $scope.deleteAttribute = deleteAttribute;
            //
        }
    ]);