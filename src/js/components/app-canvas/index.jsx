"use strict";

var devicePixelRatio = window.devicePixelRatio || 1;
var util = require('./fonts/fontpath-util');
var Font = require('../../data/robot-font');

var FontPathRenderer = require('./fonts/fontpath-renderer');
var helloText = "hello";

var fontPathRenderer = new FontPathRenderer( helloText, Font, 200 );
var AppStore = require('../../stores/app-store');
var CONSTANTS = require('../../utils/constants');

class AppCanvas extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.canvas = React.findDOMNode(this);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(devicePixelRatio, devicePixelRatio);

        fontPathRenderer.setText(helloText);
        //fontPathRenderer.renderData(this.ctx);



        fontPathRenderer.calculateDistance();
        this.dividedPtNum = AppStore.get('sliderValue') | 0;
        fontPathRenderer.dividePoint(this.dividedPtNum);

        fontPathRenderer.renderPt(this.ctx);

        AppStore.on(CONSTANTS.CHANGE_SLIDER, this.onChangeSliderHandler.bind(this));
    }

    onChangeSliderHandler(){

        var dividedPtNum = AppStore.get('sliderValue') | 0;

        if( dividedPtNum != this.dividedPtNum){
            this.ctx.restore();
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.ctx.save();

            fontPathRenderer.dividePoint(dividedPtNum);
            fontPathRenderer.renderPt(this.ctx);

            this.dividedPtNum = dividedPtNum;
        }
    }

    render(){
        var width = window.innerWidth * devicePixelRatio;
        var height = window.innerHeight * devicePixelRatio;
        var style = {
            width  : "100%",
            height : "100%"
        };

        return (
            <canvas style={style} width={width} height={height} />
        );
    }
}

module.exports = AppCanvas;
