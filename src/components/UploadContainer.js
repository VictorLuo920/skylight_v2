import React, { Component } from 'react';
import UploadService from '../services/upload-files.service';

export default class UploadContainer extends Component {

    constructor() {
        super();
        this.state = {
            selectedFiles: undefined,
            progressInfos: [],
            message: null, 
            fileInfos: []
        };
    }

    selectFiles = (event) => {
        this.setState({
            progressInfos: [],
            selectedFiles: event.target.files,
        });
    }

    upload = (idx, file) => {
        let _progressInfos = [...this.state.progressInfos];

        UploadService.upload(file, (event) => {
          _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
          this.setState({
            _progressInfos,
          });
        })
          .then((response) => {
            this.setState((prev) => {
              let prevMessage = prev.message ? prev.message + "\n" : "";
              return {
                message: prevMessage + response.data.message,
              };
            });
    
            return UploadService.getFiles();
          })
          .then((files) => {
            this.setState({
              fileInfos: files.data,
            });
          })
          .catch(() => {
            _progressInfos[idx].percentage = 0;
            this.setState({
              progressInfos: _progressInfos,
              message: "Could not upload the file!",
            });
          });
    }

    uploadFiles = () => {
        const selectedFiles = this.state.selectedFiles;

        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
        {
            progressInfos: _progressInfos,
            message: null,
        },
        () => {
        for (let i = 0; i < selectedFiles.length; i++) {
            this.upload(i, selectedFiles[i]);
        }
      }
    );
    }

    render() {
        const { selectedFiles, progressInfos, message, fileInfos } = this.state;
        
        return (
            <div>
                {progressInfos &&
                progressInfos.map((progressInfo, index) => (
                <div className="mb-2">
                    <span>{progressInfo.fileName}</span>
                    <div className="progress">
                        <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progressInfo.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progressInfo.percentage + "%" }}
                        >
                        {progressInfo.percentage}%
                        </div>
                        </div>
                    </div>
                ))}
                
        <label className="btn btn-default">
          <input type="file" multiple onChange={this.selectFiles} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.uploadFiles}
        >
          Upload
        </button>

            </div>
        )
    }


}