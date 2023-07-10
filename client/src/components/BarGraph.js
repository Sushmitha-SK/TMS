import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarGraph = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {

        if (data && data.length > 0) {
            // Set up chart dimensions
            const width = 400;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const chartWidth = width - margin.left - margin.right;
            const chartHeight = height - margin.top - margin.bottom;


            const xScale = d3
                .scaleBand()
                .domain(data.map((d) => d.label))
                .range([0, chartWidth])
                .padding(0.1);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.count)])
                .range([chartHeight, 0]);


            const svg = d3.select(chartRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height);


            const chart = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);


            chart
                .selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => xScale(d.label))
                .attr('y', (d) => yScale(d.count))
                .attr('width', xScale.bandwidth())
                .attr('height', (d) => chartHeight - yScale(d.count))
                .style('fill', (d) => d.color);

            // Add labels
            chart
                .selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', (d) => xScale(d.label) + xScale.bandwidth() / 2)
                .attr('y', (d) => yScale(d.count) - 5)
                .attr('text-anchor', 'middle')
                .text((d) => d.count);


            chart
                .append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(d3.axisBottom(xScale));


            chart.append('g').call(d3.axisLeft(yScale));


            return () => {
                svg.remove();
            };
        }
    }, [data]);

    return <div ref={chartRef}></div>;
};

export default BarGraph;
