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
            var _deviceType = [];
            //end

            //new $http to getting data from interface, local development using json file,
            // production should change to interface
            var request = {
                method : 'GET',
                url : 'json/device.json',
                header: {
                    'Content-Type': 'json'
                }
            };
            $http(request).then(function(successResponse){
                $log.info('getting Device List Successfully.');
                $log.debug(successResponse);
                _device_list = successResponse.data;
                _device_detail = _device_list[0];
                $scope._device = _device_list;
                $scope._device_detail = _device_detail;
            },function(FailedResponse){
                $log.error('getting Device List Failed.');
                $log.error(FailedResponse);
            });
            //

            var changeDeviceDetail = function(device){
                $log.debug(device);
                angular.element('.elLayouts-Wrapper').addClass('elLayouts-Wrapper-showInfo');
                angular.element('.elLayouts-deviceInfo').addClass('elLayouts-deviceInfo-show');
                $scope._device_detail = device;
            };


            //setting parameter to $scope
            $scope._device = _device;
            $scope._device_detail = _device_detail;
            $scope.changeDeviceDetail = changeDeviceDetail;
            //
        }
    ]);
