import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TaskCount = ({ count }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (count && chartRef.current) {
            drawChart();
        }
    }, [count]);

    const drawChart = () => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const pie = d3.pie().value(d => d.value);
        const data = pie([{ value: count }, { value: 100 - count }]);

        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        const color = d3.scaleOrdinal().range(['#9BBFE0', '#E8A09A']);

        const g = svg
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const legend = svg
            .append('g')
            .attr('transform', `translate(${width + 30}, 20)`);

        const legendData = ['Tasks', 'Remaining'];

        legend
            .selectAll('rect')
            .data(legendData)
            .enter()
            .append('rect')
            .attr('y', (d, i) => i * 20)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', (d, i) => color(i));

        legend
            .selectAll('text')
            .data(legendData)
            .enter()
            .append('text')
            .attr('x', 20)
            .attr('y', (d, i) => i * 20 + 9)
            .text(d => d);



        const arcs = g
            .selectAll('arc')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .text(d => d.value);
    };
    return <svg ref={chartRef} width="300" height="200" />;

};

export default TaskCount;
