import React, { Component } from 'react';
import './../assets/style.css';
import _ from 'lodash';

 var routes = [
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
 var stations = [];
 var uniqS = [];

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            currentStation: '',
            currentLine: 1,
            activeStations: [],
        }
        // this.showStation = this.showStation.bind(this);
    }
    componentDidMount(){
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
            console.log(stations);
            var uniqSTemp = _.uniq(stations);
            console.log(uniqSTemp);
            for(let i=0;i<uniqSTemp.length;i++){
                uniqSTemp[i] = (uniqSTemp[i].toString()).replace(/ /g, "");
            }
            uniqS = _.uniq(uniqSTemp)
            console.log(uniqS);
            // console.log(routes);
            // var arrTemp = []
            // for (let i = 1; i < routes.length; i++) {
            //     var routeString = (routes[i].stations.name.toString()).replace(/ /g, "");
            //     var uniqsString = (uniqS[this.state.currentIndex].toString()).replace(/ /g, "");
            //     if (routeString === uniqsString) {
            //         arrTemp.push(routes[i]);
            //     }
            // }
            this.setState({ uniqS, stations, routes, loading: 1 });
        }, 1000);
        console.log(routes);
    }
    showStationContainer(){
        let table = [];
        for(let i=0;i<this.state.uniqS.length;i++){
            table.push(
                <div className="row">
                    <div className="col-md-12">
                        <h3>{this.state.uniqS[i]}</h3>
                    </div>
                </div>
            )
        }
        return table;
    }
    showData() {
        if (this.state.loading === 1) {
            return (
                <div>
                    <div className="container-fluid  text-center">
                        <div className="row align-items-center">
                            <div className="col-md-6 mx-auto" >
                               {this.showStationContainer()}
                            </div>
                            <div className="col-md-6 mx-auto align-items-center">

                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
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

export default MainPage;