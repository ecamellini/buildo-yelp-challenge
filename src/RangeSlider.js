import React from 'react';
import Slider from 'material-ui/Slider';

//TODO: display horizontally

class RangeSlider extends React.Component {
    render() {
        return (
            <div>
                <Slider
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    onChange={this.props.onChange} />
                <label>Radius: {this.props.value} KM</label>
            </div>
        );
    }
}

export default RangeSlider;