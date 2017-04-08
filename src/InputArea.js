import React from 'react'
import RangeSlider from './RangeSlider'
import SearchBar from './SearchBar';
import Colors from './colors.js'


const styles = {
    inputArea: {
        backgroundColor: Colors.APP_GREY,
        display: 'flex',
        flexFlow: 'row wrap',
    }
}


/**
 * User input area component: it contains a searchbar and
 * a slider.
 */
class InputArea extends React.Component {
    render(){
        return(
            <div style={styles.inputArea}>
                    <SearchBar
                        handleNewRequest={this.props.handleNewRequest}
                        handleUpdateInput={this.props.handleUpdateInput}
                        searchText={this.props.searchText}
                        dataSource={this.props.autoCompleteSource}
                        hintText={this.props.hintText} />
                    <RangeSlider
                        min={this.props.minRadius}
                        max={this.props.maxRadius}
                        step={this.props.radiusStep}
                        defaultValue={this.props.defaultRadius}
                        value={this.props.radius}
                        onChange={this.props.handleRadiusChange}
                        onDragStop={this.props.onDragStop} />
                </div>
        )
    }
}

export default InputArea;