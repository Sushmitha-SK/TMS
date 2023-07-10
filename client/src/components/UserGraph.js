import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const UserGraph = ({ userCount }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
        const width = 500;
        const height = 300;
        const xScale = d3.scaleBand().range([0, width]).padding(0.1);
        const yScale = d3.scaleLinear().range([height, 0]);
        const xAxis = d3.axisBottom().scale(xScale);
        const yAxis = d3.axisLeft().scale(yScale);
        xScale.domain(userCount.map(user => user.name));
        yScale.domain([0, d3.max(userCount, user => user.age)]);
        svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);
        svg.append('g').call(yAxis);
        svg
            .selectAll('.bar')
            .data(userCount)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', user => xScale(user.name))
            .attr('y', user => yScale(user.age))
            .attr('width', xScale.bandwidth())
            .attr('height', user => height - yScale(user.age));
    }, [userCount]);

    return (
        <svg ref={svgRef} width="500" height="300"></svg>
    );
};

export default UserGraph;
