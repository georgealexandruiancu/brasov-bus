import React, { Component } from 'react';
import './../assets/style.css';
import _ from 'lodash';
import * as fs from 'fs';
// import station1 from './../data/line 31 dus/Carpatilor .json';
export var routes = [
    {
        line: '',
        stations: [
            {
                name: '',
                hours: []
            }
        ]
    }
];
export var stations = [];
export var uniqS;
class ParseAll extends Component {
    constructor() {
        super();
        this.state = {
            loading: 0
        }
    }
    componentDidMount() {
        var reqFolders = require.context('./../data/', true, /json/);
        reqFolders.keys().forEach(function (key) {
            var keySplit = key.split('./');
            var rawNameLine = keySplit[1].split('/');
            setTimeout(function () {
                var station1 = require("./../data/" + keySplit[1]);
                var arrTime = [];
                for (let j = 0; j < station1.hours.length; j++) {
                    if (station1.hours[j].h === "Ora" || station1.hours[j].h === "") {
                        j++;
                    }
                    for (let i = 0; i < station1.hours[j].min.length; i = i + 2) {
                        var hour = station1.hours[j].h + ":" + station1.hours[j].min[i] + station1.hours[j].min[i + 1];
                        arrTime.push(hour);
                    }
                }
                let firstSplit = key.split('./');
                let fullStation = firstSplit[1].split(".json");
                let fullName = fullStation[0].split("/");
                var nameStation = key[1].split(".json");
                stations.push(fullName[1])
                routes.push({
                    line: rawNameLine[0],
                    stations: {
                        name: fullName[1],
                        hours: arrTime
                    }
                })
            }, 300);
        })
        setTimeout(() => {
            uniqS = _.uniq(stations);
            console.log(uniqS);
            this.setState({loading: 1});
        },1000);
        console.log(routes);
    }
    showData(){
        if(this.state.loading === 1){
            return(
                <h1>Fetch done</h1>
            )
        }else{
            return(
                <div className="spinner">
                    <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle className="length" fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                    </svg>
                    <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                    </svg>
                    <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                    </svg>
                    <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
                    </svg>
                </div>
            )
        }
    }
       
        render() {
            return (
                <div className="wh100">
                    <div className="posCenter">
                        {this.showData()}
                    </div>
                </div>
            );
        }
}

export default ParseAll;
