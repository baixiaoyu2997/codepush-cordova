/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var vConsole = new VConsole();
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    // var onError = function (error) {
    //     console.info("An error occurred. " + error);
    // };

    // var onUpdateCheck = function (remotePackage) {
    //     console.info(remotePackage.download);
    //     if (!remotePackage) {
    //         console.info("The application is up to date.");
    //     } else {
    //         // The hash of each previously reverted package is stored for later use.
    //         // This way, we avoid going into an infinite bad update/revert loop.
    //         if (!remotePackage.failedInstall) {
    //             console.info(remotePackage.download);
    //             console.info("A CodePush update is available. Package hash: " + remotePackage.packageHash);
    //         } else {
    //             console.info("The available update was attempted before and failed.");
    //         }
    //     }
    // };

    // window.codePush.checkForUpdate(onUpdateCheck, onError,'h2bjeX3B6_2Hw6dvyBiVdkWkWXmqT5bb2P3Dj');

    this.receivedEvent("deviceready");
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");
    console.info("Received Event: " + id);
  },
};

app.initialize();
var checkUpdate = () => {
  var syncCallback = (stats) => {
    // 检查更新流程：CHECKING_FOR_UPDATE>AWAITING_USER_ACTION>DOWNLOADING_PACKAGE>INSTALLING_UPDATE>重绘制后触发UPDATE_INSTALLED
    switch (stats) {
      case SyncStatus.UP_TO_DATE:
        console.info("已经是最新版");
        break;
      case SyncStatus.UPDATE_INSTALLED:
        console.info("UPDATE_INSTALLED");
        break;
      case SyncStatus.UPDATE_IGNORED:
        console.info("UPDATE_IGNORED");
        break;
      case SyncStatus.ERROR:
        console.info("ERROR");
        break;
      case SyncStatus.IN_PROGRESS:
        console.info("IN_PROGRESS");
        break;
      case SyncStatus.CHECKING_FOR_UPDATE:
        console.info("检查更新");
        break;
      case SyncStatus.AWAITING_USER_ACTION:
        console.info("AWAITING_USER_ACTION");
        break;
      case SyncStatus.DOWNLOADING_PACKAGE:
        console.info("用户点击下载之后");
        break;
      case SyncStatus.INSTALLING_UPDATE:
        console.info("INSTALLING_UPDATE");
        break;
      default:
        console.info("default");
        break;
    }
  };
  const syncOptions = {
    updateDialog: {
      appendReleaseDescription: true, // 是否显示更新日志
      descriptionPrefix: " \n\n版本信息:\n", // 默认更新日志前缀，默认" Description: "
      optionalIgnoreButtonLabel: "取消", // 忽略更新文字，默认ignore
      optionalInstallButtonLabel: "确定", // 安装更新文字，默认install
      optionalUpdateMessage: "确认要切换至该版本吗？", // 更新主体文字，默认"An update is available. Would you like to install it?".
      updateTitle: "提示", // 标题，默认"Update available"
    }
  };
  const downloadProgress = (downloadProgress) => {
    if (downloadProgress) {
      // Update "downloading" modal with current download %
      console.info(
        "Downloading " +
          downloadProgress.receivedBytes +
          " of " +
          downloadProgress.totalBytes
      );
    }
  };
  const syncErrback=(e)=>{
    console.info(e);
  }
  window.codePush.sync(syncCallback, syncOptions, downloadProgress,syncErrback);
};
