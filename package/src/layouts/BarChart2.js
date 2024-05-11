import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const BarChart2 = ({ data }) => {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            width={600}
            height={300}
        >
            <VictoryAxis
                tickValues={data.map(item => item.name)}
                tickFormat={data.map(item => item.points)}
            />
            <VictoryAxis dependentAxis />
            <VictoryBar
                data={data}
                x="name"
                y="points"
            />
        </VictoryChart>
    );
};

export default BarChart2;
