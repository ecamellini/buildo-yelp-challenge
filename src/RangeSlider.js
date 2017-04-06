import React from 'react';
import Slider from 'material-ui/Slider';


/**
 * RangeSlider component:
 * it contains a slider that can be used to select a value within a range.
 * Max, min, step and default value can  be set through the properties.
 * 
 * This component should be controlled by another component that should pass
 * value (real time value) and an onChange callback.
 */
class RangeSlider extends React.Component {
    render() {
        return (
            <div>
                <Slider
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value} // Current value 
                    onChange={this.props.onChange} // Callback
                />
                <label>Radius: {this.props.value} KM</label>
            </div>
        );
    }
}

export default RangeSlider;