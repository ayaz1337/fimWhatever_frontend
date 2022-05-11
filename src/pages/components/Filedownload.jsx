import React from 'react'
import axios from 'axios';
import fileDownload from 'js-file-download';

export default function Filedownload() {
  axios({
    url: '/api2/syslog',
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    fileDownload(response.data, 'syslog.txt');
  })
}