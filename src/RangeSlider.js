import React from 'react';
import Slider from 'material-ui/Slider';
import Colors from './colors.js'


const styles = {
    container: {
        order: 1,
        flex: '3 1 60%',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    slider: {
        alignSelf: 'center',
        order: 0,
        flex: '0.6',
        paddingBottom: 15,
        maxHeight: 50,
        minWidth: 200
    },
    label: {
        alignSelf: 'center',
        order: 1,
        flex: '0.1',
        color: Colors.APP_GREY_TEXT
    }
}


/**
 * RangeSlider component:
 * it contains a slider that can be used to select a value within a range.
 * Max, min, step and default value can  be set through the properties.
 * 
 * This component is controlled by another component that should pass
 * value (real time value) and an onChange callback.
 */
class RangeSlider extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <Slider style={styles.slider}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value} // Current value 
                    onChange={this.props.onChange} // Callback
                    onDragStop={this.props.onDragStop}
                />
                <label style={styles.label}>
                    &nbsp;&nbsp;&nbsp;{this.props.value}km
                </label>
            </div>
        );
    }
}

export default RangeSlider;